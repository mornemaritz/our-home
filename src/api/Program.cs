using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using OurHome.Api;

var builder = WebApplication.CreateBuilder(args);
// var credential = new DefaultAzureCredential();
// builder.Configuration.AddAzureKeyVault(new Uri(builder.Configuration["AZURE_KEY_VAULT_ENDPOINT"]), credential);

builder.Services.AddScoped<ProductRepository>();
builder.Services.AddDbContext<OurHomeDb>(options =>
{
    var localConnectionString = builder.Configuration.GetConnectionString("InventoryConnectionString"); // Local dev connection string
    
    var connectionString = (
        localConnectionString,
        builder.Configuration["PRE_EXISTING_DB_CONNECTION_STRING"],
        builder.Configuration[builder.Configuration["AZURE_SQL_CONNECTION_STRING_KEY"] ?? string.Empty]) switch 
    {
        (null, null, null) => throw new InvalidOperationException("Connection string not found"),
        (string inventoryConnectionString, _, _) => inventoryConnectionString,
        (null, string preExistingDbConnectionString, _) => preExistingDbConnectionString,
        (null, null, string azureSqlConnectionString) => azureSqlConnectionString
    };

    options.UseSqlServer(localConnectionString, sqlOptions => sqlOptions.EnableRetryOnFailure());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddApplicationInsightsTelemetry(builder.Configuration);

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<OurHomeDb>();
    await db.Database.MigrateAsync();
}

app.UseCors(policy =>
{
    policy.AllowAnyOrigin();
    policy.AllowAnyHeader();
    policy.AllowAnyMethod();
});

// Swagger UI
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("./openapi.yaml", "v1");
    options.RoutePrefix = "";
});

app.UseStaticFiles(new StaticFileOptions
{
    // Serve openapi.yaml file
    ServeUnknownFileTypes = true,
});


app.MapGroup("/products")
    .MapOurHomeApi()
    .WithOpenApi();
app.Run();