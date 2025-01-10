import { INavLink, INavLinkGroup, Nav, Stack } from '@fluentui/react';
import { FC, ReactElement, MouseEvent } from 'react';
import { useNavigate } from 'react-router';
// import { list } from '../actions/itemActions';
// import { Product } from '../models/product';

interface ProductMenuItemProps {
    listName: string
    listUrl: string
    // products?: Product[]
}

const ProductsMenuItem: FC<ProductMenuItemProps> = (props: ProductMenuItemProps): ReactElement => {
    const navigate = useNavigate();

    const onNavLinkClick = (evt?: MouseEvent<HTMLElement>, item?: INavLink) => {
        evt?.preventDefault();

        if (!item) {
            return;
        }

        navigate(item.url);
    }

    const createNavGroups = (listName: string, listUrl: string): INavLinkGroup[] => {

        return [{
            links: [
                {
                    key: listName,
                    name: listName,
                    url: listUrl,
                    links: []
                }
            ]
        }]
    }

    return (
        <Stack>
            <Stack.Item>
                <Nav
                    onLinkClick={onNavLinkClick}
                    groups={createNavGroups(props.listName, props.listUrl)} />
            </Stack.Item>
        </Stack>
    );
};

export default ProductsMenuItem;