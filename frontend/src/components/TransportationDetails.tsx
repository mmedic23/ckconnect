import { TransportationDto } from "@/types/transportation"
import { Accordion, ActionIcon, Flex, Grid, Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { SearchableSelect } from "./SearchableSelect";
import { IconCancel, IconCheck, IconDeviceFloppy, IconLine, IconRestore, IconTrash } from "@tabler/icons-react";
import { LocationDto } from "@/types/location";


export default function TransportationDetails({
    transportationDto,
    locationsMap,
    onUpdate,
    onDelete,
}: {
    transportationDto: TransportationDto;
    locationsMap: { [id: number]: LocationDto };
    onUpdate: (updatedTransportation: TransportationDto) => Promise<void>;
    onDelete: (deletedTransportation: TransportationDto) => Promise<void>;
}) {
    const [transportation, setTransportation] = useState(transportationDto);
    const [headerTransportation, setHeaderTransportation] = useState(transportationDto)
    const [isUpdating, setIsUpdating] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

    useEffect(() => {
        setTransportation(transportationDto);
        setHeaderTransportation(transportationDto);
    }, [transportationDto]);

    const handleChange = (field: keyof TransportationDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTransportation((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
        setHasUnsavedChanges(true);
    };

    const handleSubmit = async () => {
        setIsUpdating(true);
        await onUpdate(transportation);

        setHeaderTransportation(transportation);
        setHasUnsavedChanges(false);
        setIsUpdating(false);
    };

    const handleDelete = () => {
        setIsConfirmingDelete(true);
    }

    const handleDeleteConfirm = async () => {
        setIsUpdating(true);
        await onDelete(transportation);
        setIsUpdating(false);
        setIsUpdating(false);
    };

    const handleDeleteCancel = () => {
        setIsConfirmingDelete(false);
    }

    const resetEditorState = () => {
        setTransportation(headerTransportation);
        setHasUnsavedChanges(false);
    }

    const locationOptions = Object.entries(locationsMap)
        .map(a => a[1])
        .toSorted((a, b) => a.id - b.id)
        .map((loc) => { return ({ 'display': loc.name, 'value': loc.id?.toString() }) });

    const typeOptions = [
        { 'display': 'FLIGHT', 'value': 'FLIGHT' },
        { 'display': 'BUS', 'value': 'BUS' },
        { 'display': 'SUBWAY', 'value': 'SUBWAY' },
        { 'display': 'UBER', 'value': 'UBER' },
    ]

    return (
        <Accordion.Item key={headerTransportation.id} value={headerTransportation.id?.toString()}>
            <Accordion.Control icon={<IconLine />}>
                <Grid mr="30%">
                    <Grid.Col span={5}>{locationsMap[headerTransportation.originLocationId]?.name ?? ''}</Grid.Col>
                    <Grid.Col span={2}>
                        {headerTransportation.type}
                    </Grid.Col>
                    <Grid.Col span={5}>{locationsMap[headerTransportation.destinationLocationId]?.name ?? ''}</Grid.Col>
                </Grid>
            </Accordion.Control>
            <Accordion.Panel>
                <Flex gap="lg" wrap="wrap">
                    <SearchableSelect
                        items={locationOptions}
                        label="Origin"
                        defaultItem={{
                            display: locationsMap[transportation.originLocationId]?.name ?? '',
                            value: transportation.originLocationId?.toString() ?? '',
                        }}
                        onChange={handleChange('originLocationId')}
                    />
                    <SearchableSelect
                        items={typeOptions}
                        label="Type"
                        defaultItem={{
                            display: transportation.type,
                            value: transportation.type,
                        }}
                        onChange={handleChange('type')}
                    />
                    <SearchableSelect
                        items={locationOptions}
                        label="Destination"
                        defaultItem={{
                            display: locationsMap[transportation.destinationLocationId]?.name ?? '',
                            value: transportation.destinationLocationId?.toString() ?? '',
                        }}
                        onChange={handleChange('destinationLocationId')}
                    />

                    <Group gap="xs">
                        <ActionIcon size="input-md" mt="auto" color="lime" loading={isUpdating} disabled={!hasUnsavedChanges} onClick={handleSubmit}>
                            <IconDeviceFloppy />
                        </ActionIcon>
                        <ActionIcon size="input-md" mt="auto" color="blue" loading={isUpdating} disabled={!hasUnsavedChanges} onClick={resetEditorState}>
                            <IconRestore />
                        </ActionIcon>
                        {isConfirmingDelete ? (
                            <>
                                <ActionIcon size="input-md" mt="auto" color="cyan" loading={isUpdating} onClick={handleDeleteCancel}>
                                    <IconCancel />
                                </ActionIcon>
                                <ActionIcon size="input-md" mt="auto" color="red" loading={isUpdating} onClick={handleDeleteConfirm}>
                                    <IconCheck />
                                </ActionIcon>
                            </>
                        ) : (
                            <ActionIcon size="input-md" mt="auto" color="red" onClick={handleDelete}>
                                <IconTrash />
                            </ActionIcon>
                        )}
                    </Group>
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    )
}