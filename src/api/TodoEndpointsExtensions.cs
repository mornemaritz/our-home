﻿using Microsoft.AspNetCore.Http.HttpResults;

namespace SimpleTodo.Api
{
    public static class TodoEndpointsExtensions
    {
        public static RouteGroupBuilder MapTodoApi(this RouteGroupBuilder group)
        {
            group.MapGet("/", GetProducts);
            group.MapPost("/", CreateList);
            group.MapGet("/{listId}", GetList);
            group.MapPut("/{listId}", UpdateList);
            group.MapDelete("/{listId}", DeleteList);
            group.MapGet("/{listId}/items", GetListItems);
            group.MapPost("/{listId}/items", CreateListItem);
            group.MapGet("/{listId}/items/{itemId}", GetListItem);
            group.MapPut("/{listId}/items/{itemId}", UpdateListItem);
            group.MapDelete("/{listId}/items/{itemId}", DeleteListItem);
            group.MapGet("/{listId}/state/{state}", GetListItemsByState);

            group.MapGet("/products", GetProducts);
            group.MapPost("/products/{productId}/actions", PerformActionOnProduct);
            group.MapGet("/inventory", GetInventory);
            group.MapGet("/shopping-list", GetShoppingList);

            return group;
        }

        public static async Task<Ok<IEnumerable<TodoList>>> GetLists(ListsRepository repository, int? skip = null, int? batchSize = null)
        {
            return TypedResults.Ok(await repository.GetListsAsync(skip, batchSize));
        }

        public static async Task<IResult> CreateList(ListsRepository repository, CreateUpdateTodoList list)
        {
            var todoList = new TodoList(list.name)
            {
                Description = list.description
            };

            await repository.AddListAsync(todoList);

            return TypedResults.Created($"/lists/{todoList.Id}", todoList);
        }

        public static async Task<IResult> GetList(ListsRepository repository, Guid listId)
        {
            var list = await repository.GetListAsync(listId);

            return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
        }

        public static async Task<IResult> UpdateList(ListsRepository repository, Guid listId, CreateUpdateTodoList list)
        {
            var existingList = await repository.GetListAsync(listId);
            if (existingList == null)
            {
                return TypedResults.NotFound();
            }

            existingList.Name = list.name;
            existingList.Description = list.description;
            existingList.UpdatedDate = DateTimeOffset.UtcNow;

            await repository.SaveChangesAsync();

            return TypedResults.Ok(existingList);
        }

        public static async Task<IResult> DeleteList(ListsRepository repository, Guid listId)
        {
            if (await repository.GetListAsync(listId) == null)
            {
                return TypedResults.NotFound();
            }

            await repository.DeleteListAsync(listId);

            return TypedResults.NoContent();
        }

        public static async Task<IResult> GetListItems(ListsRepository repository, Guid listId, int? skip = null, int? batchSize = null)
        {
            if (await repository.GetListAsync(listId) == null)
            {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(await repository.GetListItemsAsync(listId, skip, batchSize));
        }

        public static async Task<IResult> CreateListItem(ListsRepository repository, Guid listId, CreateUpdateTodoItem item)
        {
            if (await repository.GetListAsync(listId) == null)
            {
                return TypedResults.NotFound();
            }

            var newItem = new TodoItem(listId, item.name)
            {
                Name = item.name,
                Description = item.description,
                State = item.state,
                CreatedDate = DateTimeOffset.UtcNow
            };

            await repository.AddListItemAsync(newItem);

            return TypedResults.Created($"/lists/{listId}/items{newItem.Id}", newItem);
        }

        public static async Task<IResult> GetListItem(ListsRepository repository, Guid listId, Guid itemId)
        {
            if (await repository.GetListAsync(listId) == null)
            {
                return TypedResults.NotFound();
            }

            var item = await repository.GetListItemAsync(listId, itemId);

            return item == null ? TypedResults.NotFound() : TypedResults.Ok(item);
        }

        public static async Task<IResult> UpdateListItem(ListsRepository repository, Guid listId, Guid itemId, CreateUpdateTodoItem item)
        {
            var existingItem = await repository.GetListItemAsync(listId, itemId);
            if (existingItem == null)
            {
                return TypedResults.NotFound();
            }

            existingItem.Name = item.name;
            existingItem.Description = item.description;
            existingItem.CompletedDate = item.completedDate;
            existingItem.DueDate = item.dueDate;
            existingItem.State = item.state;
            existingItem.UpdatedDate = DateTimeOffset.UtcNow;

            await repository.SaveChangesAsync();

            return TypedResults.Ok(existingItem);
        }

        public static async Task<IResult> DeleteListItem(ListsRepository repository, Guid listId, Guid itemId)
        {
            if (await repository.GetListItemAsync(listId, itemId) == null)
            {
                return TypedResults.NotFound();
            }

            await repository.DeleteListItemAsync(listId, itemId);

            return TypedResults.NoContent();
        }

        public static async Task<IResult> GetListItemsByState(ListsRepository repository, Guid listId, string state, int? skip = null, int? batchSize = null)
        {
            if (await repository.GetListAsync(listId) == null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(await repository.GetListItemsByStateAsync(listId, state, skip, batchSize));
        }

        public static async Task<IResult> GetProducts(ProductRepository repository, int? skip = null, int? batchSize = null)
        {
            var list = await repository.ListProductsAsync(skip, batchSize);

            return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
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
                case "AddToShoppingList":
                    product.AddToShoppingList();
                    break;
                case "Pick":
                    product.Pick();
                    break;
                case "PackAway":
                    product.PackAway();
                    break;
                default:
                    break;
            }

            await repository.SaveChangesAsync();

            return TypedResults.Ok(product);
        }

        public static async Task<IResult> GetInventory(ProductRepository repository, int? skip = null, int? batchSize = null)
        {
            var list = await repository.GetInventoryAsync(skip, batchSize);

            return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
        }

        public static async Task<IResult> GetShoppingList(ProductRepository repository, int? skip = null, int? batchSize = null)
        {
            var list = await repository.GetShoppingListAsync(skip, batchSize);

            return list == null ? TypedResults.NotFound() : TypedResults.Ok(list);
        }
    }


    public record CreateUpdateTodoList(string name, string? description = null);
    public record CreateUpdateTodoItem(string name, string state, DateTimeOffset? dueDate, DateTimeOffset? completedDate, string? description = null);
}
