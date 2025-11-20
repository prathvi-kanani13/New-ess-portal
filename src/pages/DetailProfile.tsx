import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, User, Calendar, MapPin, IdCard, Users, CalendarDays, Building, CreditCard, FileText, Key, Flag, Heart, MoreVertical } from "lucide-react";
import Image from "../assets/avtar.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import BankInfoCard from "../cards/BankInfoCard";
import FamilyInfoCard from "../cards/FamilyInfoCard";
import EducationInfoCard from "../cards/EducationInfoCard";
import ExperienceInfoCard from "../cards/ExperienceInfoCard";
import AddSkillsCard from "../cards/AddSkillsCard";
import KycCard from "../cards/KycCard";

interface InfoItem {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

interface EmergencyContact {
    name: string;
    relation: string;
    number: number;
}

interface Project {
    id: number
    name: string
    tasks: number
    completed: number
    deadline: string
    leadName: string
    leadAvatar: string
}

interface AssetItem {
    id: number
    name: string
    code: string
    assigned: string
    image: string
    assignedBy: {
        name: string
        avatar: string
    }
}

export default function DetailProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [basicInfo] = useState<InfoItem[]>([
        { label: "Client ID", value: "CLT-0024", icon: <IdCard size={16} /> },
        { label: "Team", value: "UI/UX Design", icon: <Users size={16} /> },
        { label: "Date Of Join", value: "1st Jan 2023", icon: <CalendarDays size={16} /> },
        { label: "Report Office", value: "Douglas Martini", icon: <Building size={16} /> },
    ]);

    const [contactInfo, setContactInfo] = useState<InfoItem[]>([
        { label: "Phone", value: "(163) 2459 315", icon: <Phone size={16} /> },
        { label: "Email", value: "perralt12@example.com", icon: <Mail size={16} /> },
        { label: "Gender", value: "Male", icon: <User size={16} /> },
        { label: "Birthday", value: "24th July 2000", icon: <Calendar size={16} /> },
        { label: "Address", value: "1861 Bayonne Ave, Manchester, NJ, 08759", icon: <MapPin size={16} /> },
    ]);

    const [personalInfo, setPersonalInfo] = useState<InfoItem[]>([
        { label: "AadharCard No.", value: "QRET4566FGRT", icon: <CreditCard size={16} /> },
        { label: "PanCard No.", value: "15 May 2029", icon: <FileText size={16} /> },
        { label: "Nationality", value: "Indian", icon: <Flag size={16} /> },
        { label: "Religion", value: "Hindu", icon: <Heart size={16} /> },
        { label: "Marital Status", value: "Single", icon: <Users size={16} /> },
        { label: "UAN Number", value: "No", icon: <Key size={16} /> },
    ]);

    const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
        { name: "Rakesh Bhai", relation: "Father", number: 9878787866 },
        { name: "Meena Ben", relation: "Mother", number: 9876543210 },
    ]);

    const projects: Project[] = [
        {
            id: 1,
            name: "Project One",
            tasks: 8,
            completed: 15,
            deadline: "31 July, 2025",
            leadName: "John Doe",
            leadAvatar: "https://github.com/shadcn.png",
        },
        {
            id: 2,
            name: "Project Two",
            tasks: 5,
            completed: 9,
            deadline: "15 August, 2025",
            leadName: "Jane Smith",
            leadAvatar: "https://github.com/shadcn.png",
        },
    ]

    const assets: AssetItem[] = [
        {
            id: 1,
            name: "Dell Laptop - #5354545",
            code: "Ast 001",
            assigned: "22 Nov, 2025 10:32 AM",
            image: Image,
            assignedBy: {
                name: "John Doe",
                avatar: "https://github.com/shadcn.png",
            },
        },
        {
            id: 2,
            name: "Dell Laptop - #5354545",
            code: "Ast 001",
            assigned: "22 Nov, 2025 10:32 AM",
            image: Image,
            assignedBy: {
                name: "John Doe",
                avatar: "https://github.com/shadcn.png",
            },
        },
    ]

    const handleInfoChange = (
        index: number,
        value: string,
        setter: React.Dispatch<React.SetStateAction<InfoItem[]>>
    ) => {
        setter((prev) => {
            const newData = [...prev];
            newData[index].value = value;
            return newData;
        });
    };

    const handleEmergencyChange = (
        index: number,
        field: "name" | "relation" | "number",
        value: string
    ) => {
        const newContacts = [...emergencyContacts];
        if (field === "number") newContacts[index][field] = Number(value);
        else newContacts[index][field] = value;
        setEmergencyContacts(newContacts);
    };

    return (
        <div className="px-1">
            {/* Header */}
            <div className="py-6">
                <h1 className="text-2xl font-bold text-[#202C4B]">Detail Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Left card */}
                <Card className="lg:col-span-1 pb-6 rounded-sm mb-6">
                    <CardHeader className="relative text-center h-34">
                        <div className="bg-black h-20 w-full absolute top-0 left-0 rounded-t-sm"></div>
                        <img
                            src={Image}
                            alt="avatar"
                            className="w-15 h-15 rounded-full mx-auto absolute top-12 left-1/2 transform -translate-x-1/2"
                        />
                        <div className="pt-27">
                            <CardTitle className="text-md font-semibold text-[#202C4B]">Stephan Peralt</CardTitle>
                            <div className="flex items-center gap-2 justify-center text-xs mt-1">
                                <span className="bg-[#2125291A] px-3 py-1 rounded-sm font-semibold">Software Developer</span>
                                <span className="bg-[#3B70801A] text-[#3B7080] px-3 py-1 rounded-sm">10+ years of Experience</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="mt-6 space-y-2 text-sm">
                        {basicInfo.map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#6B7280]">
                                    {item.icon}
                                    <span className="font-semibold text-[#6B7280]">{item.label}</span>
                                </div>
                                <span className="font-semibold">{item.value}</span>
                            </div>
                        ))}

                        <div className="mt-5">
                            <Button
                                className="w-full bg-[#252A30] hover:bg-[#1B2440] text-white text-sm px-4 py-2 rounded-sm"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                Edit Info
                            </Button>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-4 space-y-2 border-t pt-4">
                            <h3 className="font-bold mb-4">Basic Information</h3>
                            {contactInfo.map((item, index) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[#6B7280]">{item.icon}<span className="font-semibold text-[#6B7280]">{item.label}</span></div>
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 rounded-sm w-1/2 text-right"
                                            value={item.value}
                                            onChange={(e) => handleInfoChange(index, e.target.value, setContactInfo)}
                                        />
                                    ) : (
                                        <span className="font-semibold break-words text-right">{item.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Personal Info */}
                        <div className="mt-4 space-y-2 border-t pt-4">
                            <h3 className="font-bold mb-4">Personal Information</h3>
                            {personalInfo.map((item, index) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[#6B7280]">{item.icon}<span className="font-semibold text-[#6B7280]">{item.label}</span></div>
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 rounded-sm w-1/2 text-right"
                                            value={item.value}
                                            onChange={(e) => handleInfoChange(index, e.target.value, setPersonalInfo)}
                                        />
                                    ) : (
                                        <span className="font-semibold">{item.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Emergency Contacts */}
                        <div className="mt-4 space-y-2 border-t pt-4">
                            <h3 className="font-bold mb-4">Emergency Contact Number</h3>
                            {emergencyContacts.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {isEditing ? (
                                            <>
                                                <input
                                                    className="border px-2 py-1 rounded-sm w-28"
                                                    value={item.name}
                                                    onChange={(e) => handleEmergencyChange(index, "name", e.target.value)}
                                                />
                                                <input
                                                    className="border px-2 py-1 rounded-sm w-28"
                                                    value={item.relation}
                                                    onChange={(e) => handleEmergencyChange(index, "relation", e.target.value)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-semibold text-[#6B7280]">{item.name}</span>
                                                <span>- {item.relation}</span>
                                            </>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <input
                                            className="border px-2 py-1 rounded-sm w-32 text-right"
                                            value={item.number}
                                            onChange={(e) => handleEmergencyChange(index, "number", e.target.value)}
                                        />
                                    ) : (
                                        <span className="font-semibold">{item.number}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t">
                            <Button className="w-1/2 bg-[#252A30] hover:bg-[#1B2440] text-white text-sm py-2 rounded-sm">
                                Save Info
                            </Button>

                            <Button className="w-1/2 bg-[#252A30] hover:bg-[#1B2440] text-white text-sm py-2 rounded-sm">
                                View Info Status
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Right card */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About Employee */}
                    <Card className="relative p-4 rounded-sm">
                        <div>
                            <h4 className="font-bold mb-2 text-lg text-[#202C4B] border-b pb-4">About Employee</h4>
                            <p className="text-sm text-[#677788] leading-relaxed py-2">
                                As an award-winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years
                                of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach,
                                which helped me to create numerous brands that are relevant, meaningful, and loved.
                            </p>
                        </div>
                    </Card>

                    {/* Info Boxes */}
                    <BankInfoCard />

                    <FamilyInfoCard />

                    <EducationInfoCard />

                    <ExperienceInfoCard />

                    <AddSkillsCard />

                    <KycCard />

                    {/* Projects / Assets Tabs */}
                    <Card className="rounded-sm">
                        <Tabs defaultValue="projects" className="w-full p-4">
                            <div className="border-b">
                                <TabsList className="">
                                    <TabsTrigger value="projects" className="text-md data-[state=active]:text-[#126195]">Projects</TabsTrigger>
                                    <TabsTrigger value="assets" className="text-md data-[state=active]:text-[#126195]">Assets</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="projects" className="mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projects.map((project) => (
                                        <Card key={project.id} className="rounded-sm">
                                            <CardContent className="p-4 space-y-3">
                                                <div className="flex items-center gap-3 pb-1">
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center">
                                                        <img src={Image} alt={project.name} />
                                                    </div>

                                                    <div>
                                                        <h4 className="font-semibold text-[#202C4B] text-md">{project.name}</h4>
                                                        <div className="flex items-center text-sm text-gray-500 gap-4">
                                                            <span>{project.tasks} Tasks</span>
                                                            <span>{project.completed} Completed</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 my-2"></div>

                                                <div className="flex items-center justify-between text-sm p-2">
                                                    <div>
                                                        <p className="text-gray-500">Deadline</p>
                                                        <p className="font-medium text-[#202C4B]">{project.deadline}</p>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={project.leadAvatar} alt={project.leadName} />
                                                            <AvatarFallback>{project.leadName}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-gray-500">Project Lead</p>
                                                            <p className="font-medium text-[#202C4B]">{project.leadName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="assets" className="mt-2 space-y-3">
                                {assets.map((asset) => (
                                    <Card key={asset.id} className="relative rounded-sm">
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                                                        <img
                                                            src={asset.image}
                                                            alt={asset.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-[#202C4B] text-md">{asset.name}</h4>
                                                        <div className="flex items-center text-sm text-gray-500 gap-2">
                                                            <span className="text-red-500 font-semibold">{asset.code}</span>
                                                            <span className="bg-red-500 h-1.5 w-1.5 rounded-full"></span>
                                                            <span>Assigned on {asset.assigned}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mr-12">
                                                    <div className="text-right">
                                                        <p className="text-gray-500 text-sm">Assigned by</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <img
                                                                src={asset.assignedBy.avatar}
                                                                alt={asset.assignedBy.name}
                                                                className="w-6 h-6 rounded-full"
                                                            />
                                                            <p className="font-medium text-[#202C4B] text-sm">{asset.assignedBy.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <MoreVertical
                                                className="absolute top-4 right-4 text-[#6B7280] cursor-pointer"
                                                size={20}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}
