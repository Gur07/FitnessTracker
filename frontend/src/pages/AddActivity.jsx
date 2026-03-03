import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { createActivity } from "../api/activity";

const AddActivity = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "Running",
    duration: "",
    caloriesBurned: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createActivity({
        ...form,
        duration: Number(form.duration),
        caloriesBurned: Number(form.caloriesBurned),
      });

      navigate("/dashboard"); // redirect after success
    } catch (err) {
      console.error("Create failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-6">
          Add New Activity
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">
              Activity Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            >
              <option>Running</option>
              <option>Cycling</option>
              <option>Swimming</option>
              <option>Walking</option>
              <option>Yoga</option>
              <option>Gym</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 font-medium">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Calories */}
          <div>
            <label className="block mb-1 font-medium">
              Calories Burned
            </label>
            <input
              type="number"
              name="caloriesBurned"
              value={form.caloriesBurned}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-1 font-medium">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
          >
            {loading ? "Adding..." : "Add Activity"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddActivity;