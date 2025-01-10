import { FC, ReactElement } from 'react';
// import TodoListMenu from '../components/todoListMenu';
// import { TodoList } from '../models/todoList';
import { ProductLink } from '../models/product';
import ProductsMenuItem from '../components/productsMenuItem';

interface SidebarProps {
    // selectedList?: TodoList
    // lists?: TodoList[];
    // onListCreate: (list: TodoList) => void
    productLinks?: ProductLink[]
}

const Sidebar: FC<SidebarProps> = (props: SidebarProps): ReactElement => {
    return (
        <div>
            {/* <div>
                <TodoListMenu
                    selectedList={props.selectedList}
                    lists={props.lists}
                    onCreate={props.onListCreate} />
            </div> */}
            <div>
                {props.productLinks?.map((link, index) => {
                    return (
                            <ProductsMenuItem key={index}
                                listName={link.name}
                                listUrl={link.url} />
                    )})}
                {/* <ProductsMenuItem
                    listName='products'
                    products={props.products}/> */}
            </div>
        </div>
    );
};

export default Sidebar;