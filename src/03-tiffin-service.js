/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if (mealType !== "veg" && mealType !== "nonveg" && mealType !== "jain") {
    return null;
  }

  if (!name || name.trim() === "") return null;
  let totalCost = 0;
  let dailyRate;

  switch (mealType) {
    case "veg":
      dailyRate = 80;
      totalCost += dailyRate * days;
      break;
    case "nonveg":
      dailyRate = 120;
      totalCost += dailyRate * days;
      break;
    case "jain":
      dailyRate = 90;
      totalCost += dailyRate * days;
      break;
    default:
      return null;
      break;
  }

  return { name, mealType, days, dailyRate, totalCost };
}

export function combinePlans(...plans) {
  // Your code here
  if (plans.length === 0) return null;

  return plans.reduce(
    (acc, plan) => {
      acc.totalCustomers += 1;
      acc.totalRevenue += plan.totalCost;

      acc.mealBreakdown[plan.mealType] =
        (acc.mealBreakdown[plan.mealType] || 0) + 1;
      return acc;
    },
    {
      totalCustomers: 0,
      totalRevenue: 0,
      mealBreakdown: {},
    },
  );
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (!plan) return null;
  const { name, mealType, days, dailyRate, totalCost } = plan;

  const addonNames = addons.reduce((acc, addon) => {
    acc.push(addon.name);
    return acc;
  }, []);

  const totalAddonPrice = addons.reduce((total, addon) => {
    const prices = Array.isArray(addon.price) ? addon.price : [addon.price];
    return total + prices.reduce((sum, p) => sum + p, 0);
  }, 0);

  const newdailyRate = dailyRate + totalAddonPrice;

  const newtotalCost = newdailyRate * days;

  return {
    name,
    mealType,
    days,
    dailyRate: newdailyRate,
    totalCost: newtotalCost,
    addonNames,
  };
}
