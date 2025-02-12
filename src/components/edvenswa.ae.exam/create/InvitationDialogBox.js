import { Delete } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AUTH_USERNAME_FIELD_ID } from "../../edvenswa.ae.auth/constants/constants";
import { getFormFields } from "../../edvenswa.ae.auth/forms/getFields";
import { isValidEmail } from "../../edvenswa.ae.common/validation/Validation";

export default function InvitationDialogBox(props) {

    const [invitations, setInvitations] = useState([]);
    const fields = getFormFields([AUTH_USERNAME_FIELD_ID]);
    const [error, setError] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        if(props.invitations && props.invitations.length > 0) {
            setInvitations(props.invitations);
        }
        // eslint-disable-next-line
    },[]);

    const handleEmailChange = (event) => {
        const value = event.target.value;        
        if(!isValidEmail(value)) {
            setError("Invaid email address");
            return;
        }
        setError(null);
        const isInvitationExists = invitations.find(invitation => (invitation === value));
        if(!isInvitationExists) {
            setInvitations([...invitations, value]);
        }        
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogContent sx={{ marginTop: "1rem" }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        {
                            fields.map((field, idx) => {
                                return (
                                    <TextField
                                        {...field}
                                        key={idx}
                                        label={t(field.label)}
                                        placeholder={t(field.placeholder)}
                                        fullWidth
                                        InputProps={field.inputProps}
                                        onChange={handleEmailChange}
                                        helperText={error}
                                        error={error}
                                    />
                                )
                            })
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={"column-reverse"} spacing={1}>
                            {
                                invitations && invitations.length > 0
                                    ? invitations.map((invitation, idx) => {
                                        return (
                                            <Chip label={invitation} key={idx} 
                                                deleteIcon={<Delete sx={{ color: "#d19c9c !important", justifyContent: "flex-end"}}></Delete>}
                                                onDelete={() => setInvitations(invitations.filter(invite => (invite !== invitation)))}                                                
                                            />
                                        )
                                    })
                                    : <></>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        props.onSelect(invitations);
                        props.onClose();
                    }}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}