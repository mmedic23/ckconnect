import { apiUrl } from "@/Properties";
import { LocationDto } from "@/types/location";
import { RichTransportationDto, TransportationDto } from "@/types/transportation";
import { Accordion, ActionIcon, Grid, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TransportationDetails from "./TransportationDetails";


export function TransportationsTable() {
    const [transportations, setTransportations] = useState<TransportationDto[]>([]);
    const [locations, setLocations] = useState<{ [id: number]: LocationDto }>({});
    const [isCreatingTransportation, setIsCreatingTransportation] = useState(false);
    const [openedItems, setOpenedItems] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiUrl}transportations`);
            if (!response.ok) {
                console.log(await response.text());
                return;
            }
            const transportationsJson = await response.json();
            const transportationsData = transportationsJson.map((t: RichTransportationDto) => {
                const transportationDto: TransportationDto = {
                    id: t.id,
                    originLocationId: t.origin.id,
                    destinationLocationId: t.destination.id,
                    type: t.type
                }
                return transportationDto;
            });

            setTransportations(transportationsData);
        };

        const fetchLocations = async () => {
            const response = await fetch(`${apiUrl}locations`);
            if (!response.ok) {
                console.log(await response.text());
                return;
            }
            const locationsJson: LocationDto[] = await response.json();
            const locationsMap = locationsJson.reduce((acc, location) => {
                acc[location.id] = location;
                return acc;
            }, {} as { [id: number]: LocationDto });
            setLocations(locationsMap);
        }

        fetchData();
        fetchLocations();
    }, []);

    useEffect(() => {
        if (isCreatingTransportation && !openedItems.includes('-1')) {
            setOpenedItems((prev) => [...prev, '-1'])
        }
    }, [isCreatingTransportation]);

    const handleTransportationUpdate = async (updatedTransportation: TransportationDto) => {
        const response = await fetch(`${apiUrl}transportations/${updatedTransportation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTransportation),
        });

        if (!response.ok) {
            console.log(await response.text());
            return; // TODO
        }

        setTransportations((prev) => prev.map((t) => (t.id === updatedTransportation.id ? updatedTransportation : t)));
    };

    const handleTransportationDelete = async (deletedTransportation: TransportationDto) => {
        const response = await fetch(`${apiUrl}transportations/${deletedTransportation.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.log(await response.text());
            return; // TODO
        }

        setTransportations((prev) => prev.filter((loc) => loc.id !== deletedTransportation.id));
    };

    const handleTransportationCreate = async (createdTransportation: TransportationDto) => {
        const response = await fetch(`${apiUrl}transportations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createdTransportation),
        });

        if (!response.ok) {
            console.log(await response.text());
            return; // TODO
        }

        const responseJson = await response.json();
        createdTransportation.id = responseJson['id'];

        setTransportations((prev) => [...prev, createdTransportation]);
        setIsCreatingTransportation(false);
    };

    return (
        <Stack my="lg" gap="xs" pos="relative">
            <Grid ml={60} mr="30%">
                <Grid.Col p={0} span={5}>
                    <Text fw={700}>Origin</Text>
                </Grid.Col>
                <Grid.Col p={0} span={2}>
                    <Text fw={700}>Type</Text>
                </Grid.Col>
                <Grid.Col p={0} span={5}>
                    <Text fw={700}>Destination</Text>
                </Grid.Col>
            </Grid>
            <ActionIcon pos="absolute" right={3} top={-30} size="input-md" color="lime" radius="xl" disabled={isCreatingTransportation} onClick={() => setIsCreatingTransportation(true)}>
                <IconPlus />
            </ActionIcon>
            <Accordion multiple value={openedItems} onChange={setOpenedItems}>
                <>
                    {transportations
                        .toSorted((a, b) => a.id - b.id)
                        .map((transportationDto) => {
                            return (
                                <TransportationDetails key={transportationDto.id} transportationDto={transportationDto} locationsMap={locations} onUpdate={handleTransportationUpdate} onDelete={handleTransportationDelete} />
                            );
                        })}
                    {isCreatingTransportation && (
                        <TransportationDetails
                            key="new_transportation"
                            transportationDto={{
                                id: -1,
                                destinationLocationId: -1,
                                originLocationId: -1,
                                type: 'FLIGHT'
                            }}
                            locationsMap={locations}
                            onUpdate={handleTransportationCreate}
                            onDelete={async () => {
                                setIsCreatingTransportation(false);
                            }}
                        />
                    )}
                </>
            </Accordion>
        </Stack>
    );
}