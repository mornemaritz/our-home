import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faXmark, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import config from './config';

const productsUrl = config.api.baseUrl + '/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('Products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(productsUrl);
        if(response.status >= 200 && response.status <= 299) {
          const productsResponse = await response.json();
          setProducts(productsResponse);
        }
        else {
          console.log('http error', response.status, response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const PerformProductAction = async (id, action) => {
    const response = await fetch(`${productsUrl}/${id}/actions?action=${action}`, {
      method: 'POST'
    });
    if(response.status >= 200 && response.status <= 299) {
      const updatedProduct = await response.json();
      setProducts([...products.map(product => product.id === updatedProduct.id ? updatedProduct : product)]);
    }
    else {
      console.log('http error', response.status, response.statusText);
    }
  };

  return (
    <div className="w3-row-padding">
      <div className="w3-card-4 w3-responsive w3-border w3-margin">

        <div className="w3-bar w3-theme">
          <button className={`w3-bar-item w3-button w3-padding-16 ${tab === 'Products' ? ' w3-theme-dark' : ''}`} onClick={() => setTab('Products')}>Products</button>
          <button className={`w3-bar-item w3-button w3-padding-16 ${tab === 'Shopping' ? ' w3-theme-dark' : ''}`} onClick={() => setTab('Shopping')}><FontAwesomeIcon style={{ paddingRight: '0.5em' }} icon={faCartShopping}/>Shopping List</button>
          <button className={`w3-bar-item w3-button w3-padding-16 ${tab === 'Inventory' ? ' w3-theme-dark' : ''}`} onClick={() => setTab('Inventory')}><FontAwesomeIcon style={{ paddingRight: '0.5em' }} icon={faList}/>Inventory</button>
        </div>

        {tab === 'Products' &&
        <table className="w3-table w3-striped w3-bordered">
          <tbody>
            {products.map((product) => {
              const { id, name, isOnShoppingList, isInInventory } = product;
                return (
                  <tr key={id}>
                    <td style={{ verticalAlign: "middle" }}>{name}</td>
                    {isOnShoppingList
                    ? <td>
                        <button className="w3-button w3-theme w3-card-4 w3-round"  onClick={() => PerformProductAction(id, 'remove-from-shopping-list')}>
                        <FontAwesomeIcon icon={faXmark} style={{ paddingRight: '0.5em' }} color='red'/>
                          {/* Shopping List */}
                        <FontAwesomeIcon icon={faCartShopping}/>
                        </button>
                      </td>
                    : <td>
                        <button className="w3-button w3-theme w3-card-4 w3-round" onClick={() => PerformProductAction(id, 'add-to-shopping-list')}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: '0.5em' }}/>
                          {/* Shopping List */}
                        <FontAwesomeIcon icon={faCartShopping}/>
                        </button>
                      </td>
                    }
                    {isInInventory
                    ?
                      <td>
                        <button className="w3-button w3-theme w3-card-4 w3-round" onClick={() => PerformProductAction(id, 'remove-from-inventory')}>
                        <FontAwesomeIcon icon={faXmark} style={{ paddingRight: '0.5em' }} color='red'/>
                          {/* Inventory */}
                        <FontAwesomeIcon icon={faList}/>
                        </button>
                      </td>
                    :
                      <td>
                        <button className="w3-button w3-theme w3-card-4 w3-round" onClick={() => PerformProductAction(id, 'add-to-inventory')}>
                        <FontAwesomeIcon icon={faPlus} style={{ paddingRight: '0.5em' }}/>
                          {/* Inventory */}
                        <FontAwesomeIcon icon={faList}/>
                        </button>
                      </td>
                    }
                  </tr>
                );
            })}
          </tbody>
        </table>}
        

         {tab === 'Shopping' &&
        <table className="w3-table w3-striped w3-bordered">
          <tbody>
            {products.filter(p => p.isOnShoppingList).map((product) => {
              const { id, name, isPicked } = product;
                return (
                  <tr key={id}>
                    <td>
                      <input id={id} type="checkbox" className="w3-check" checked={isPicked} 
                        onChange={() => PerformProductAction(id, isPicked ? 'unpick' : 'pick')}>
                      </input>
                      <label htmlFor={id} style={{ verticalAlign: "middle", paddingLeft: '0.5em' }}>{name}</label>
                    </td>
                    <td>
                      <button disabled={!isPicked} className="w3-button w3-theme w3-card-4 w3-round" onClick={() => PerformProductAction(id, 'pack-away')}>
                      <FontAwesomeIcon icon={faPlus} style={{ paddingRight: '0.5em' }}/>
                        {/* Inventory */}
                      <FontAwesomeIcon icon={faList}/>
                      </button>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>}

        {tab === 'Inventory' &&
        <table className="w3-table w3-striped w3-bordered">
          <tbody>
            {products.filter(p => p.isInInventory).map((inventoryProduct) => {
              const { id, name } = inventoryProduct;
                return (
                  <tr key={id}>
                    <td style={{ verticalAlign: "middle" }}>{name}</td>
                    <td>
                      <button className="w3-button w3-theme w3-card-4 w3-round" onClick={() => PerformProductAction(id, 'remove-from-inventory')}>
                      <FontAwesomeIcon icon={faXmark} style={{ paddingRight: '0.5em' }} color='red'/>
                        {/* Inventory */}
                      <FontAwesomeIcon icon={faList}/>
                      </button>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>}

      </div>
    </div>
  );
};
export default Products;