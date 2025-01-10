import { FC, ReactElement } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import { Stack } from '@fluentui/react';
import { headerStackStyles, mainStackStyles, rootStackStyles, sidebarStackStyles } from '../ux/styles';

const Layout: FC = (): ReactElement => {

    const productLinks = [
        { name: 'products', url: '/products' },
        { name: 'shopping-list', url: '/shopping-list' },
        { name: 'inventory', url: '/inventory' }
    ];

    return (
        <Stack styles={rootStackStyles}>
            <Stack.Item styles={headerStackStyles}>
                <Header></Header>
            </Stack.Item>
            <Stack horizontal grow={1}>
                <Stack.Item styles={sidebarStackStyles}>
                    <Sidebar
                        productLinks={productLinks} />
                </Stack.Item>
                <Stack.Item grow={1} styles={mainStackStyles}>
                    <Routes>
                        { productLinks.map((link, index) => {
                            return (
                                <Route key={index} path={link.url} element={<HomePage />} />
                            );
                        })}
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </Stack.Item>
            </Stack>
        </Stack>
    );
}

export default Layout;
