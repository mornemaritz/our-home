using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

public class TodoDb : DbContext
{
    public TodoDb(DbContextOptions options) : base(options) { }
    public DbSet<Product> Products => Set<Product>();
}