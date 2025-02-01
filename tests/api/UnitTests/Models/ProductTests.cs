using FluentAssertions;
using OurHome.Api.Models;

namespace UnitTests.Models;
public class InventoryItemTests
{
  [Fact]
  public void AddToShoppingList_ShouldSetIsOnShoppingListToTrue()
  {
    // Arrange
    var productUnderTest = new Product("Test", "TestTenant");

    // Act
    productUnderTest.AddToShoppingList();

    // Assert
    productUnderTest.IsOnShoppingList.Should().BeTrue();
  }

  [Fact]
  public void AddToShoppingList_ShouldSetIsPickedToFalse()
  {
    // Arrange
    var productUnderTest = new Product("Test", "TestTenant");

    // Act
    productUnderTest.AddToShoppingList();

    // Assert
    productUnderTest.IsPicked.Should().BeFalse();
  }

  [Fact]
  public void Pick_ShouldSetPickedToTrue()
  {
    // Arrange
    var productUnderTest = new Product("Test", "TestTenant");

    // Act
    productUnderTest.Pick();

    // Assert
    productUnderTest.IsPicked.Should().BeTrue();
  }

  [Fact]
  public void PackAway_ShouldSetIsInInventoryToTrue()
  {
    // Arrange
    var productUnderTest = new Product("Test", "TestTenant");

    // Act
    productUnderTest.PackAway();

    // Assert
    productUnderTest.IsInInventory.Should().BeTrue();
  }

  [Fact]
  public void PackAway_ShouldSetIsOnShoppingListAndIsPickedToFalse()
  {
    // Arrange
    var productUnderTest = new Product("Test", "TestTenant");

    // Act
    productUnderTest.PackAway();

    // Assert
    productUnderTest.IsOnShoppingList.Should().BeFalse();
    productUnderTest.IsPicked.Should().BeFalse();
  }
}