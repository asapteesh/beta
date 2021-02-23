import React, { useCallback, useEffect, useState } from 'react';
import DisclaimerDialog from '../../containers/DisclaimerDialog';

const DISCLAIMER_STORAGE_KEY = 'flux_accepted_disclaimer';

export default function DisclaimerDialogConnector() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = !!localStorage.getItem(DISCLAIMER_STORAGE_KEY);

        if (!hasAccepted) {
            setOpen(true);
        }
    }, []);

    const handleClose = useCallback(() => {
        localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'yes');
        setOpen(false);
    }, []);

    return (
        <DisclaimerDialog
            open={open}
            onRequestClose={handleClose}
        />
    );
}
