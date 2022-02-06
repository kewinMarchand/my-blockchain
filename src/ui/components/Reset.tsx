import React, {ReactElement} from "react";
import {Box, Button} from "@mui/material";

export const Reset = (): ReactElement => {
    function handleClick() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Box mb={5} mt={3}>
            <Button variant={'contained'} type={'submit'} color={'secondary'} onClick={handleClick}>
                Reset local storage
            </Button>
        </Box>
    )
}
