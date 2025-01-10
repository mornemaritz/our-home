import { FC, ReactElement } from 'react';
import { ProductLink } from '../models/product';
import ProductsMenuItem from '../components/productsMenuItem';

interface SidebarProps {
    productLinks?: ProductLink[]
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps): ReactElement => {
    return (
        <div>
            <div>
                {props.productLinks?.map((link, index) => {
                    return (
                            <ProductsMenuItem key={index}
                                listName={link.name}
                                listUrl={link.url} />
                    )})}
            </div>
        </div>
    );
};

export default Sidebar;