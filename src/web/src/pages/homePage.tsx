import { useEffect, useContext, useMemo, useState } from 'react';
import { Stack } from '@fluentui/react';
import ProductListItemPane from '../components/productListItemPane';
import * as productActions from '../actions/productActions';
import { TodoContext } from '../components/todoContext';
import { AppContext } from '../models/applicationState';
import { ProductActions } from '../actions/productActions';
import { stackItemPadding } from '../ux/styles';
import { bindActionCreators } from '../actions/actionCreators';
import WithApplicationInsights from '../components/telemetryWithAppInsights.tsx';

const HomePage = () => {
    const appContext = useContext<AppContext>(TodoContext)
    const actions = useMemo(() => ({
        products: bindActionCreators(productActions, appContext.dispatch) as unknown as ProductActions
    }), [appContext.dispatch]);

    const [isReady, setIsReady] = useState(false)
    
    // Add a new useEffect to load products
    useEffect(() => {
        const loadProducts = async () => {
            await actions.products.list();
            setIsReady(true)
        }

        loadProducts();
    }, []);

    return (
        <Stack>
            <Stack.Item tokens={stackItemPadding}>
                <ProductListItemPane
                    products={appContext.state.products}
                    disabled={!isReady} />
            </Stack.Item>
        </Stack >
    );
};

const HomePageWithTelemetry = WithApplicationInsights(HomePage, 'HomePage');

export default HomePageWithTelemetry;
