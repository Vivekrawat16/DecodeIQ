import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { User, Mail, Briefcase, FileText, Github, Linkedin, Code } from "lucide-react";

function ProfilePage() {
    const { authUser, setAuthUser } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initialize state with default values if they are undefined
    const [formData, setFormData] = useState({
        name: authUser?.name || "",
        title: authUser?.title || "",
        bio: authUser?.bio || "",
        github: authUser?.github || "",
        linkedin: authUser?.linkedin || "",
        skills: authUser?.skills ? authUser.skills.join(", ") : "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convert skills string back to array, trimming whitespace
        const skillsArray = formData.skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);

        const payload = {
            ...formData,
            skills: skillsArray
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile updated successfully!");
                setAuthUser(data); // update global context instantly
                setIsEditing(false);
            } else {
                toast.error(data.error || "Failed to update profile.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full bg-base-300 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100 p-8 rounded-2xl shadow-sm border border-base-content/10">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={authUser?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.name)}&background=random`}
                                alt="Profile"
                                className="size-24 rounded-full object-cover border-4 border-base-200 shadow-md"
                            />
                            {/* In the future, this is where a camera icon could go to update image */}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {formData.name || "Your Name"}
                            </h1>
                            {formData.title && (
                                <p className="text-base-content/60 font-medium mt-1">
                                    {formData.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`btn ${isEditing ? 'btn-ghost text-red-500 hover:bg-red-500/10' : 'btn-primary'}`}
                        >
                            {isEditing ? "Cancel Editing" : "Edit Profile"}
                        </button>
                    </div>
                </div>

                {/* Form / View Mode */}
                <div className="bg-base-100 rounded-2xl shadow-sm border border-base-content/10 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <User className="size-4" /> Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    required
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors disabled:opacity-70 disabled:border-transparent"
                                />
                            </div>

                            {/* Email (Read Only) */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <Mail className="size-4" /> Email
                                </label>
                                <input
                                    type="email"
                                    value={authUser?.email || ""}
                                    disabled
                                    className="input input-bordered w-full bg-base-200/50 opacity-70 cursor-not-allowed border-transparent"
                                />
                                <span className="text-[10px] text-base-content/40 px-1">Email cannot be changed</span>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <Briefcase className="size-4" /> Professional Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="e.g. Frontend Developer"
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors disabled:opacity-70 disabled:border-transparent"
                                />
                            </div>

                            {/* GitHub */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <Github className="size-4" /> GitHub URL
                                </label>
                                <input
                                    type="url"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="https://github.com/yourusername"
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors disabled:opacity-70 disabled:border-transparent"
                                />
                            </div>

                            {/* LinkedIn */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <Linkedin className="size-4" /> LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="https://linkedin.com/in/yourusername"
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors disabled:opacity-70 disabled:border-transparent"
                                />
                            </div>

                            {/* Skills */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <Code className="size-4" /> Skills
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="React, Node.js, Python, System Design"
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors disabled:opacity-70 disabled:border-transparent"
                                />
                                <span className="text-[10px] text-base-content/40 px-1">Separate skills with commas</span>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-base-content/80">
                                    <FileText className="size-4" /> Summary Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="Tell us a little bit about yourself..."
                                    className="textarea textarea-bordered w-full h-32 bg-base-200/50 focus:bg-base-100 transition-colors resize-none disabled:opacity-70 disabled:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        {isEditing && (
                            <div className="flex justify-end pt-4 border-t border-base-content/10">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary min-w-[150px] shadow-lg shadow-primary/20"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
