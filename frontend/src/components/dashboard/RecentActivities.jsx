import { useEffect, useState } from "react";
import {
  getActivities,
  updateActivity,
  deleteActivity,
} from "../../api/activity";
import Button from "../Button";

const RecentActivities = ({ refresh }) => {
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const res = await getActivities();
    setActivities(res.data.activities || []);
  };

  // 🔥 When Edit is clicked
  const handleEditClick = (activity) => {
    setEditingId(activity._id);
    setEditForm({
      type: activity.type,
      duration: activity.duration,
      caloriesBurned: activity.caloriesBurned,
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 When Done is clicked
  const handleDone = async (id) => {
    try {
      await updateActivity(id, editForm);

      setEditingId(null);
      refresh();
      fetchActivities();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
      refresh();
      fetchActivities();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Recent Activities
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-3">Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {activities.slice(0, 5).map((activity) => (
              <tr
                key={activity._id}
                className="border-b hover:bg-gray-50"
              >
                {/* TYPE */}
                <td className="py-3">
                  {editingId === activity._id ? (
                    <input
                      name="type"
                      value={editForm.type}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    activity.type
                  )}
                </td>

                {/* DURATION */}
                <td>
                  {editingId === activity._id ? (
                    <input
                      type="number"
                      name="duration"
                      value={editForm.duration}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    `${activity.duration} min`
                  )}
                </td>

                {/* CALORIES */}
                <td>
                  {editingId === activity._id ? (
                    <input
                      type="number"
                      name="caloriesBurned"
                      value={editForm.caloriesBurned}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    activity.caloriesBurned
                  )}
                </td>

                {/* DATE (not editable) */}
                <td>
                  {new Date(activity.date).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex justify-center gap-3">
                    {editingId === activity._id ? (
                      <Button
                        text="Done"
                        onClick={() => handleDone(activity._id)}
                        className="px-4 py-1 rounded-full text-sm bg-green-500 hover:bg-green-600 text-white"
                      />
                    ) : (
                      <Button
                        text="Edit"
                        onClick={() =>
                          handleEditClick(activity)
                        }
                        className="px-4 py-1 rounded-full text-sm"
                      />
                    )}

                    <Button
                      text="Delete"
                      onClick={() =>
                        handleDelete(activity._id)
                      }
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-full text-white"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;