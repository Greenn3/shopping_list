import App from "./App";
import {Box, Button, Typography} from "@mui/material";
import keycloak from "./keycloak";

function Top_header () {
    return(

        <Box sx={{ bgcolor: "skyblue", height:"100px", display:"flex" , textAlign:"center"}}>
            <Typography variant={"h3"}>The ultimate shopping list</Typography>
            <Typography variant={"h4"}>Welcome, {keycloak.tokenParsed?.preferred_username}</Typography>
            <Button variant={"contained"} onClick={() => keycloak.logout()}>Logout</Button>
        </Box>
    );
}
export default Top_header;