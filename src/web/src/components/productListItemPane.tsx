import { DetailsList, DetailsListLayoutMode, Label, Spinner, SpinnerSize, Stack, IColumn, Text, IObjectWithKey, CheckboxVisibility, SelectionMode } from '@fluentui/react';
import { ReactElement, useEffect, useState, FC } from 'react';
import { Product } from '../models/product';
import { stackItemPadding } from '../ux/styles';

interface ProductListItemPaneProps {
    products?: Product[]
    disabled: boolean
}

interface ProductDisplayItem extends IObjectWithKey {
    id?: string
    name: string
    data: Product
}

const createListItems = (products: Product[]): ProductDisplayItem[] => {
    return products.map(product => ({
        ...product,
        key: product.id,
        data: product
    }));
};


const ProductListItemPane: FC<ProductListItemPaneProps> = (props: ProductListItemPaneProps): ReactElement => {
    const [items, setItems] = useState(createListItems(props.products || []));

    // Handle products changed
    useEffect(() => {
        setItems(createListItems(props.products || []));
    }, [props.products]);

    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100 },
    ];

    const renderItemColumn = (item: ProductDisplayItem, _index?: number, column?: IColumn) => {
        const fieldContent = item[column?.fieldName as keyof ProductDisplayItem] as string;

        switch (column?.key) {
            case "name":
                return (
                    <Text variant="small">{item.name}</Text>
                );
            default:
                return (<Text variant="small">{fieldContent}</Text>)
        }
    }

    return (
        <Stack>
            {items.length > 0 &&
                <Stack.Item>
                    <DetailsList
                        items={items}
                        columns={columns}
                        setKey="id"
                        onRenderItemColumn={renderItemColumn}
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionPreservedOnEmptyClick={true}
                        selectionMode={SelectionMode.multiple}
                        // ariaLabelForSelectionColumn="Toggle selection"
                        // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        // checkButtonAriaLabel="select row"
                        checkboxVisibility={CheckboxVisibility.always} />
                </Stack.Item>
            }
            {!props.products &&
                <Stack.Item align="center" tokens={stackItemPadding}>
                    <Label>Loading Products...</Label>
                    <Spinner size={SpinnerSize.large} labelPosition="top" /> 
                </Stack.Item>
            }
            {props.products && items.length === 0 &&
                <Stack.Item align="center" tokens={stackItemPadding}>
                    <Text>No products available.</Text>
                </Stack.Item>
            }
        </Stack>
    );
};

export default ProductListItemPane;