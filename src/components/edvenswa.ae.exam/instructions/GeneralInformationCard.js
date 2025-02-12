import { Card, CardContent,CardHeader,Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function GeneralInformationCard() {

    const { t } = useTranslation();
    
    return (
            <Card>
                <CardHeader title={t('instructions.EXAM_GENERAL_INFORMATION_TITLE')}/>
                <CardContent>
                    <Typography component="ul" variant="h5">
                        <Typography component="li">{t('instructions.TEXT_CONTENT_T1')}</Typography>
                        <Typography component="li">{t('instructions.TEXT_CONTENT_T2')}</Typography>
                        <Typography component="li">{t('instructions.TEXT_CONTENT_T3')}</Typography>
                        <Typography component="li">{t('instructions.TEXT_CONTENT_T4')}</Typography>
                    </Typography>
                </CardContent>
            </Card>
    )
}
