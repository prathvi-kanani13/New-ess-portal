export default function Profile() {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">johndoe@example.com</p>
          </div>
        </div>

        <div className="space-y-2">
          <p><strong>Username:</strong> johndoe</p>
          <p><strong>Role:</strong> Admin</p>
          <p><strong>Joined:</strong> January 1, 2023</p>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
