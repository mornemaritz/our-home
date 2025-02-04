using System.ComponentModel.DataAnnotations;

namespace OurHome.Api.Models;

public class Product
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public string Tenant { get; set; }
  public string Name { get; set; } = string.Empty;
  public bool IsOnShoppingList { get; set; } = false;
  public bool IsPicked { get; set; } = false;
  public bool IsInInventory { get; set; } = false;
  public int Index { get; set; } = 0;

  private Product()
  {
  }

  public Product(string name, string tenant)
  {
    Name = name;
    Tenant = tenant;
  }

  public void AddToShoppingList()
  {
    IsOnShoppingList = true;
  }

  public void RemoveFromShoppingList()
  {
    IsOnShoppingList = false;
  }

  public void AddToInventory()
  {
    IsInInventory = true;
  }

  public void RemoveFromInventory()
  {
    IsInInventory = false;
  }

  public void Pick()
  {
    IsPicked = true;
  }
  public void UnPick()
  {
    IsPicked = false;
  }

  public void PackAway()
  {
    IsInInventory = true;
    IsOnShoppingList = false;
    IsPicked = false;
  }
}