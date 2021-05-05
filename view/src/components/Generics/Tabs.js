import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Hidden, Grid, Button } from '@material-ui/core'
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const TabsGeneric = (props) => {
    const { config } = props
    const { tabs } = config

    const [show, setShow] = useState(0);

    const handleChange = (event, newValue) => {
        setShow(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Hidden smDown>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={show}
                            onChange={handleChange}
                            centered
                            scrollButtons="on"
                            indicatorColor="primary"
                        // textColor="primary"
                        >
                            {tabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} icon={tab.icon} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                    </AppBar>
                </Hidden>
                <Hidden only={['lg', 'md', 'xl']}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={show}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                        // textColor="primary"
                        >
                            {tabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} icon={tab.icon} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                    </AppBar>
                </Hidden>

                {tabs.map((tab, index) => (
                    <TabPanel key={index} value={show} index={index}>
                        {tab.component}
                        {config.navButtons &&
                            <Grid container justify='center'>
                                {show !== 0 && <Button onClick={() => setShow(show - 1)}>Voltar</Button>}
                                {show !== tabs.length - 1 && <Button color='primary' variant="contained" onClick={() => setShow(show + 1)}>Próximo</Button>}
                                {(show === tabs.length - 1 && config.onSubmit) &&
                                    <Button onClick={config.onSubmit} color='secondary' variant="contained">
                                        Confirmar
                                    </Button>
                                }
                            </Grid>
                        }
                    </TabPanel>
                ))}

            </Grid >
        </Grid >
    );
}


export default TabsGeneric