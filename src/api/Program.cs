using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using OurHome.Api;

var builder = WebApplication.CreateBuilder(args);
// var credential = new DefaultAzureCredential();
// builder.Configuration.AddAzureKeyVault(new Uri(builder.Configuration["AZURE_KEY_VAULT_ENDPOINT"]), credential);

builder.Services.AddScoped<ProductRepository>();
builder.Services.AddDbContext<OurHomeDb>(options =>
{
    // var connectionString = builder.Configuration[builder.Configuration["AZURE_SQL_CONNECTION_STRING_KEY"] ?? string.Empty]
    //     ?? builder.Configuration["PRE_EXISTING_DB_CONNECTION_STRING"];

    //     if (string.IsNullOrEmpty(connectionString))
    //         connectionString = builder.Configuration.GetConnectionString("InventoryConnectionString"); // Local dev connection string  

    var connectionString = builder.Configuration.GetConnectionString("InventoryConnectionString"); // Local dev connection string  
    options.UseSqlServer(connectionString, sqlOptions => sqlOptions.EnableRetryOnFailure());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddApplicationInsightsTelemetry(builder.Configuration);

var app = builder.Build();

await using (var scope = app.Services.CreateAsyncScope())
{
    var db = scope.ServiceProvider.GetRequiredService<OurHomeDb>();
    await db.Database.EnsureCreatedAsync();
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