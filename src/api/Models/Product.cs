using System.ComponentModel.DataAnnotations;

namespace Todo.Api.Models;

public class Product
{
  [Key]
  public Guid Id { get; set; } = Guid.NewGuid();
  public string Name { get; set; } = string.Empty;
  public bool IsOnShoppingList { get; private set; } = false;
  public bool IsPicked { get; set; } = false;
  public bool IsInInventory { get; set; } = false;

  private Product()
  {
  }

  public Product(string name)
  {
    Name = name;
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

  public void PackAway()
  {
    IsInInventory = true;
    IsOnShoppingList = false;
    IsPicked = false;
  }
}