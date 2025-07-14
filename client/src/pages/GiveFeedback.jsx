import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import mockEvents from "../utils/mockEvents";
import mockUser from "../utils/mockUser";

export default function GiveFeedback() {
    const { id } = useParams();
    const user = mockUser;
    const event = mockEvents.find(event => event.id === parseInt(id));

    const [rating, setRating] = React.useState('');
    const [comment, setComment] = React.useState("");

    if (!event) {
        return (
            <DashboardLayout>
                <p className="text-gray-500">Event Not Found.</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="bg-offWhite min-h-screen flex flex-col items-center justify-center px-4">
                <h2 className="text-primary font-bold text-3xl mb-6">Give Feedback</h2>

                <div>
                    <p className="text-gray-700"><strong>Event:</strong> {event.name}</p>
                    <p className="text-sm text-gray-500">Attendee: {user.email}</p>
                </div>

                <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4 mt-6">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="feedback"
                                value="like"
                                onChange={(e) => setRating(e.target.value)}
                                checked={rating === 'like'}
                            />
                            <span className="text-green-600 font-medium">Like</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="feedback"
                                value="dislike"
                                onChange={(e) => setRating(e.target.value)}
                                checked={rating === 'dislike'}
                            />
                            <span className="text-red-600 font-medium">Dislike</span>
                        </label>
                    </div>

                    <textarea
                        placeholder="Write your comment here..."
                        className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        onClick={() => alert("Feedback Given!")}
                        className={`w-full py-2 rounded-3xl text-white ${rating && comment.trim()
                            ? 'bg-primaryDark hover:bg-primary'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        disabled={!rating || !comment.trim()}
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}