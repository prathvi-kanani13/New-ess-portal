import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  postal: yup.string().required("Postal code is required"),
  currentPassword: yup.string().required("Enter current password"),
  newPassword: yup.string().required("Enter new password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
}).required();

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-1 py-6">
      <h1 className="text-2xl font-bold text-[#202C4B] mb-6">Profile</h1>

      <div className="bg-white rounded-md shadow border p-6 space-y-4">

        <h4 className="border-b border-gray-200 pb-2 font-bold text-[#202C4B] text-lg">Profile</h4>
        <h2 className="text-base font-semibold text-[#202C4B]">Basic Information</h2>

        <div className="flex gap-6 items-center bg-[#F9FAFB] p-4 rounded-lg border">
          <Avatar className="w-20 h-20">
            {profileImage ? <AvatarImage src={profileImage} /> : <AvatarFallback>IMG</AvatarFallback>}
          </Avatar>
          <div>
            <p className="font-semibold">Profile Photo</p>
            <p className="text-xs text-gray-500 mb-3">Recommended image size is 40px x 40px</p>
            <div className="flex gap-3">
              <Button className="bg-[#126195] text-white px-3 py-1">
                <label>
                  Upload
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              </Button>
              <Button variant="ghost" onClick={() => setProfileImage(null)}>Cancel</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">First Name</label>
              <Input className="flex-1" placeholder="Enter first name" {...register("firstName")} />
            </div>
            <p className="text-xs text-red-500 ml-38 mt-1">{errors.firstName?.message}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">Last Name</label>
              <Input className="flex-1" placeholder="Enter last name" {...register("lastName")} />
            </div>
            <p className="text-xs text-red-500 ml-38 mt-1">{errors.lastName?.message}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">Email</label>
              <Input className="flex-1" placeholder="Enter email" {...register("email")} />
            </div>
            <p className="text-xs text-red-500 ml-38 mt-1">{errors.email?.message}</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">Phone</label>
              <Input className="flex-1" placeholder="Enter phone number" {...register("phone")} />
            </div>
            <p className="text-xs text-red-500 ml-38 mt-1">{errors.phone?.message}</p>
          </div>
        </div>

        <h2 className="text-base font-semibold text-[#202C4B] border-t border-gray-200 pt-4">Address Information</h2>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">Address</label>
              <Input className="flex-1" placeholder="Enter address" {...register("address")} />
            </div>
            <p className="text-xs text-red-500 ml-38 mt-1">{errors.address?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">Country</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">State</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium w-32">City</label>
              <Select>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surat">Surat</SelectItem>
                  <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium w-32">Postal Code</label>
                <Input className="flex-1" placeholder="Enter postal code" {...register("postal")} />
              </div>
              <p className="text-xs text-red-500 ml-38 mt-1">{errors.postal?.message}</p>
            </div>
          </div>
        </div>

        <h2 className="text-base font-semibold text-[#202C4B] border-t border-gray-200 pt-2">Change Password</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-32">Current Password</label>
            <div className="flex-1">
              <Input
                placeholder="Enter current password"
                type="password"
                {...register("currentPassword")}
              />
              <p className="text-xs text-red-500 mt-1 ml-2">{errors.currentPassword?.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-32">New Password</label>
            <div className="flex-1">
              <Input
                placeholder="Enter new password"
                type="password"
                {...register("newPassword")}
              />
              <p className="text-xs text-red-500 mt-1 ml-2">{errors.newPassword?.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium w-32">Confirm Password</label>
            <div className="flex-1">
              <Input
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
              />
              <p className="text-xs text-red-500 mt-1 ml-2">{errors.confirmPassword?.message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" className="bg-[#126195]">Save</Button>
        </div>
      </div>
    </form>
  );
}
