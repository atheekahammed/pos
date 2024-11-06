'use client'


import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import { ReactNode, useState } from "react"
import { Menu } from '@mui/icons-material/'
import { menuItems } from "./SideBarMenu"
import { useRouter } from "next/navigation"



type LayoutProps = {
    children: ReactNode
}
export const MailLayout = (props: LayoutProps) => {
    const { children } = props
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => setOpen(!open)
    const route = useRouter()
    const handleRoute = (path: string) => route.push(path)

    return (

        <Box >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        POS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box p={2}>
                {children}
            </Box>
            <Drawer open={open} onClose={toggleDrawer}>
                <Box minWidth={'260px'}>
                    <List>
                        {menuItems.map(menu => (
                            <Box key={menu.id}>
                                <ListItemButton >
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText>{menu.caption}</ListItemText>
                                </ListItemButton>
                                {menu.childrens?.map(c => (
                                    <Box key={c.id} pl={1}>
                                        <ListItemButton onClick={() => handleRoute(c.path ?? "")}>
                                            <ListItemIcon>{c.icon}</ListItemIcon>
                                            <ListItemText>{c.caption}</ListItemText>
                                        </ListItemButton>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}