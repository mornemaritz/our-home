namespace OurHome.Api;

public static class OurHomeEndpointsExtensions
{
    public static RouteGroupBuilder MapOurHomeApi(this RouteGroupBuilder group)
    {
        group.MapGet("/", GetProducts);
        group.MapPost("/{productId}/actions", PerformActionOnProduct);

        return group;
    }

    public static async Task<IResult> GetProducts(ProductRepository repository, string tenant, int? skip = null, int? batchSize = null)
    {
        var list = await repository.ListProductsAsync(tenant, skip, batchSize);

        return list == null ? TypedResults.NotFound() : TypedResults.Ok(list.OrderBy(p => p.Index));
    }

    public static async Task<IResult> PerformActionOnProduct(ProductRepository repository, Guid productId, string action)
    {
        var product = await repository.GetProductAsync(productId);
        if (product == null)
        {
            return TypedResults.NotFound();
        }

        switch(action)
        {
            case "add-to-shopping-list":
                product.AddToShoppingList();
                break;
            case "remove-from-shopping-list":
                product.RemoveFromShoppingList();
                break;
            case "add-to-inventory":
                product.AddToInventory();
                break;
            case "remove-from-inventory":
                product.RemoveFromInventory();
                break;
            case "pick":
                product.Pick();
                break;
            case "unpick":
                product.UnPick();
                break;
            case "pack-away":
                product.PackAway();
                break;
            default:
                break;
        }

        await repository.SaveChangesAsync();

        return TypedResults.Ok(product);
    }

    public static async Task<IResult> GetInventory(ProductRepository repository, string tenant, int? skip = null, int? batchSize = null)
    {
        var list = await repository.GetInventoryAsync(tenant, skip, batchSize);

        return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
    }

    public static async Task<IResult> GetShoppingList(ProductRepository repository, string tenant, int? skip = null, int? batchSize = null)
    {
        var list = await repository.GetShoppingListAsync(tenant, skip, batchSize);

        return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
    }
}
