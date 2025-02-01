using Microsoft.EntityFrameworkCore;
using OurHome.Api.Models;

public class OurHomeDb : DbContext
{
    public OurHomeDb(DbContextOptions options) : base(options) { }
    public DbSet<Product> Products => Set<Product>();
}