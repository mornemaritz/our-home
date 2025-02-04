using Microsoft.EntityFrameworkCore;
using OurHome.Api.Models;

namespace OurHome.Api;

public class ProductRepository(OurHomeDb db)
{
    public async Task SaveChangesAsync()
    {
        await db.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> ListProductsAsync(string tenant, int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products.Where(p => p.Tenant == tenant), skip, batchSize);
    }

    public async Task<IEnumerable<Product>> GetInventoryAsync(string tenant, int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products.Where(p => p.IsInInventory && p.Tenant == tenant), skip, batchSize);
    }

    public async Task<IEnumerable<Product>> GetShoppingListAsync(string tenant, int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products.Where(p => p.IsOnShoppingList && p.Tenant == tenant), skip, batchSize);
    }

    public async Task<Product?> GetProductAsync(Guid productId)
    {
       return await db.Products.FindAsync(productId);
    }

    public async Task<Product> AddProductAsync(Product newProduct)
    {
        if ((await db.Products.SingleOrDefaultAsync(p => p.Name == newProduct.Name && p.Tenant == newProduct.Tenant)) is Product existingProduct)
        {
           return existingProduct;
        }

        return (await db.Products.AddAsync(newProduct)).Entity;
    }

    private static async Task<List<T>> ToListAsync<T>(IQueryable<T> queryable, int? skip, int? batchSize)
    {
        if (skip != null)
        {
            queryable = queryable.Skip(skip.Value);
        }

        if (batchSize != null)
        {
            queryable = queryable.Take(batchSize.Value);
        }


        return await queryable.ToListAsync();
    }
}