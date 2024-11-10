'use client'


import { Box, AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItemButton, ListItemText, ListItemIcon, Collapse } from "@mui/material"
import { ReactNode, useState } from "react"
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material/'
import { menuItems } from "./SideBarMenu"
import { usePathname, useRouter } from "next/navigation"
import { SidebarMenuItem } from "@/models/interfaces"
import { store } from "@/app/services/store"
import { Provider } from "react-redux"



type LayoutProps = {
    children: ReactNode
}
export const MailLayout = (props: LayoutProps) => {
    const { children } = props
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => setOpen(!open)
    const route = useRouter()
    const path = usePathname()
    const handleRoute = (path: string) => route.push(path)


    const [expand, setExpand] = useState("");
    const handleClickMenu = (menu: SidebarMenuItem) => {
        if (expand === menu.id) return setExpand('')
        setExpand(menu.id)
    }
    const isparent = (menu: SidebarMenuItem) => expand === menu.id


    return (
        <Box>
            <Provider store={store}>
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
                            <Box>
                                {path !== '/pos' &&
                                    <Button href="/pos" sx={{ borderRadius: 2 }} variant="outlined" color="inherit">POS</Button>
                                }
                            </Box>
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
                                        <ListItemButton onClick={() => handleClickMenu(menu)}>
                                            <ListItemIcon>{menu.icon}</ListItemIcon>
                                            <ListItemText>{menu.caption}</ListItemText>
                                            {isparent(menu) ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse
                                            in={isparent(menu)}
                                            unmountOnExit
                                        >
                                            {menu.childrens?.map(c => (
                                                <Box key={c.id} pl={2}>
                                                    <ListItemButton onClick={() => handleRoute(c.path ?? "")}>
                                                        <ListItemIcon>{c.icon}</ListItemIcon>
                                                        <ListItemText>{c.caption}</ListItemText>
                                                    </ListItemButton>
                                                </Box>
                                            ))}
                                        </Collapse>
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Provider>
        </Box>
    )
}