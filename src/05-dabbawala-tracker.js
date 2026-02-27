/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */
export function createDabbawala(name, area) {
  // Your code here
  let deliveries = [];
  let nextId = 1;

  return {
    addDelivery(from, to) {
      if (!from || !to) return -1;

      const id = nextId;
      deliveries.push({ id, from, to, status: "pending" });
      nextId++;
      return id;
    },

    completeDelivery(id) {
      const delivery = deliveries.find((d) => d.id === id);

      if (delivery !== undefined && delivery.status === "pending") {
        delivery.status = "completed";
        return true;
      } else {
        return false;
      }
    },
    getActiveDeliveries() {
      const copy = deliveries.reduce((acc, deliverie) => {
        if (deliverie.status === "pending") {
          acc.push({ ...deliverie });
        }
        return acc;
      }, []);

      if (copy.length !== 0) return copy;
      else return [];
    },
    getStats() {
      const completedandpending = deliveries.reduce((acc, deliverie) => {
        acc[deliverie.status] = (acc[deliverie.status] || 0) + 1;
        return acc;
      }, {});

      const completed = completedandpending.completed || 0;
      const pending = completedandpending.pending || 0;
      const total = completed + pending;

      let successRate = "0.00%";

      if (total !== 0) {
        successRate = ((completed / total) * 100).toFixed(2) + "%";
      }

      return { name, area, total, completed, pending, successRate };
    },
    reset() {
      deliveries.length = 0;
      nextId = 1;
      return true;
    },
  };
}
