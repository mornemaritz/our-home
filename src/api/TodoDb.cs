using Microsoft.EntityFrameworkCore;
using SimpleTodo.Api;
using Todo.Api.Models;

public class TodoDb : DbContext
{
    public TodoDb(DbContextOptions options) : base(options) { }
    public DbSet<TodoItem> Items => Set<TodoItem>();
    public DbSet<TodoList> Lists => Set<TodoList>();
    public DbSet<Product> Products => Set<Product>();
}