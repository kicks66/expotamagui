import React, { useState, useEffect } from 'react';
import '@tamagui/core/reset.css';
import {
  YStack,
  H1,
  Separator,
  Button,
  Text,
  Input,
  SizableText,
  Paragraph,
  Stack,
  H2,
  Square,
  ScrollView,
  Accordion,
  useMedia,
  XStack
} from 'tamagui';

export const Brief = () => {

    const [brief, setBrief] = useState({})

    useEffect(() => {
        const fetchBrief = async () => {
            const res = await fetch('http://localhost:3000/api/briefs/3');
            const response = await res.json();
            setBrief(response);
        }
        fetchBrief()
    }, [])

    return (
        <XStack
            // on smaller screens, have it be full width, otherwise have it be 500px wide
            $gtSm={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}
            
        >
            <ScrollView>
                { brief.id && (
                    <Stack>
                        <H1>{brief.name}</H1>
                        <Accordion overflow="hidden" type="multiple" defaultValue={['a1','a2']}>
                            <Accordion.Item value="a1">
                                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                {({ open }) => (
                                    <>
                                    <Paragraph>Creative Overview</Paragraph>
                                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                        
                                    </Square>
                                    </>
                                )}
                                </Accordion.Trigger>
                                <Accordion.Content>
                                <Paragraph>
                                    {brief.creativeOverview}
                                </Paragraph>
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item value="a2">
                                <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                {({ open }) => (
                                    <>
                                    <Paragraph>Must Include</Paragraph>
                                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                                        
                                    </Square>
                                    </>
                                )}
                                </Accordion.Trigger>
                                <Accordion.Content>
                                <Paragraph>
                                    {brief.mustInclude.map((item, index) => (
                                        <Text key={index}>{item}</Text>
                                    ))}
                                </Paragraph>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </Stack>
                )}
            </ScrollView>
        </XStack>
    )
}