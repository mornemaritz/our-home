using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace SimpleTodo.Api;

public class ProductRepository(TodoDb db)
{
    public async Task SaveChangesAsync()
    {
        await db.SaveChangesAsync();
    }

    public async Task<IEnumerable<Product>> ListProductsAsync(int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products, skip, batchSize);
    }

    public async Task<IEnumerable<Product>> GetInventoryAsync(int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products.Where(p => p.IsInInventory), skip, batchSize);
    }

    public async Task<IEnumerable<Product>> GetShoppingListAsync(int? skip, int? batchSize)
    {
        return await ToListAsync(db.Products.Where(p => p.IsOnShoppingList), skip, batchSize);
    }

    public async Task<Product?> GetProductAsync(Guid productId)
    {
       return await db.Products.FindAsync(productId);
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