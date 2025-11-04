import React, { useState, useEffect, useRef } from 'react';
import { 
    Menu, 
    Settings, 
    Bookmark, 
    Heart, 
    Flag, 
    LogOut, 
    Plus, 
    MoreHorizontal, 
    MessageCircle, 
    Repeat, 
    Send,
    Loader2 // Added for loading icon
} from 'lucide-react';

// --- Header Component ---
const AppHeader = ({ isMenuOpen, setIsMenuOpen }) => (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-20">
        {/* Logo */}
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V12C12 10.9391 12.4214 9.92173 13.1716 9.17157C13.9217 8.42143 14.9391 8 16 8H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 11C15.5304 11 16.0391 10.7893 16.4142 10.4142C16.7893 10.0391 17 9.53043 17 9C17 8.46957 16.7893 7.96086 16.4142 7.58579C16.0391 7.21071 15.5304 7 15 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        
        {/* Menu Button */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
            <Menu size={24} strokeWidth={2} />
        </button>
    </header>
);

// --- Dropdown Menu Component ---
const DropdownMenu = ({ menuRef }) => (
    <div 
        ref={menuRef} 
        className="absolute top-[73px] right-4 w-60 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
    >
        <nav className="py-2">
            <ul>
                {/* Settings */}
                <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                        <Settings size={20} />
                        <span>Settings</span>
                    </a>
                </li>
                {/* Saved */}
                <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                        <Bookmark size={20} />
                        <span>Saved</span>
                    </a>
                </li>
                {/* Liked */}
                <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                        <Heart size={20} />
                        <span>Liked</span>
                    </a>
                </li>
                {/* Divider */}
                <li className="my-1">
                    <hr className="border-gray-100" />
                </li>
                {/* Report a problem */}
                <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                        <Flag size={20} />
                        <span>Report a problem</span>
                    </a>
                </li>
                {/* Log out */}
                <li>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50">
                        <LogOut size={20} />
                        <span>Log out</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
);

// --- Post Actions Component ---
const PostActions = ({ stats }) => (
    <div className="flex justify-between items-center mt-4 text-gray-500">
        <button className="flex items-center gap-1.5 group">
            <Heart size={20} className="group-hover:text-red-500" />
            <span className="text-sm">{stats.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 group">
            <MessageCircle size={20} className="group-hover:text-blue-500" />
            <span className="text-sm">{stats.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 group">
            <Repeat size={20} className="group-hover:text-green-500" />
            <span className="text-sm">{stats.reposts}</span>
        </button>
        <button className="flex items-center gap-1.5 group">
            <Send size={20} className="group-hover:text-gray-900" />
            <span className="text-sm">{stats.sends}</span>
        </button>
    </div>
);

// --- Post Component ---
const Post = ({ post }) => (
    <article className="border-b border-gray-200">
        <div className="flex items-start p-4">
            {/* Avatar */}
            <div className="relative mr-3">
                <img src={post.avatarUrl} className="w-12 h-12 rounded-full" alt={`${post.username} avatar`} 
                    onError={(e) => { e.target.src = 'https://placehold.co/48x48/eeeeee/999999?text=?'; }}
                />
                <button className="absolute -bottom-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    <Plus size={12} strokeWidth={3} />
                </button>
            </div>
            
            <div className="flex-1">
                {/* Post Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <span className="font-bold">{post.username || '...'}</span>
                        <span className="text-gray-500 text-sm">{post.time || '...'}</span>
                    </div>
                    <button className="text-gray-400">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
                
                {/* Post Body */}
                <p className="mt-1 whitespace-pre-line">{post.text}</p>
                
                {post.media && post.media.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                        {post.media.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-3/5 bg-gray-100 rounded-xl p-4 h-48 flex items-center">
                                <p className={`text-lg ${item.isBold ? 'font-bold' : ''}`}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Post Actions */}
                {post.stats && <PostActions stats={post.stats} />}
            </div>
        </div>
    </article>
);

// --- Feed Content Component ---
const FeedContent = ({ posts, isLoading }) => {
    return (
        <div className="h-[calc(100vh-73px)] sm:h-[calc(90vh-73px)] overflow-y-auto" style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'none' }}>
            {/* Tab Navigation */}
            <nav className="flex sticky top-0 bg-white z-10">
                <a href="#" className="flex-1 text-center py-3 font-semibold border-b-2 border-black">
                    For you
                </a>
                <a href="#" className="flex-1 text-center py-3 font-medium text-gray-500 border-b border-gray-200">
                    Following
                </a>
            </nav>

            {/* Feed */}
            <main>
                {isLoading && (
                    <div className="flex justify-center items-center p-10">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                        <span className="ml-2 text-gray-500">Loading posts...</span>
                    </div>
                )}
                {!isLoading && posts.length === 0 && (
                     <div className="text-center p-10 text-gray-500">
                        No posts found.
                    </div>
                )}
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </main>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Removed Firebase-specific states (db, auth, userId)

    const menuRef = useRef(null);
    const headerRef = useRef(null); // Ref for the header to check clicks

    // Mock data for the posts
    const mockPosts = [
        {
            id: 1,
            username: 'wilinline',
            time: '20h',
            avatarUrl: 'https://placehold.co/48x48/28a745/ffffff?text=W',
            text: 'True',
            media: [
                { text: 'She is not cheating but...', isBold: true },
                { text: 'but there... flowers, r... no effort.', isBold: false },
            ],
            stats: { likes: '580', comments: '1', reposts: '219', sends: '56' }
        },
        {
            id: 2,
            username: '_dads_angle__',
            time: '1d',
            avatarUrl: 'https://placehold.co/48x48/eeeeee/999999?text=D',
            text: "Mujhe pata hai voice achhi nahi hai please don't judge",
            media: [],
            stats: { likes: '1.2k', comments: '42', reposts: '98', sends: '15' }
        }
    ];

    // Effect for fetching posts from your MongoDB backend
    useEffect(() => {
        // This function will fetch data from your API
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                // ---
                // TODO: Replace this simulated fetch with your actual API call
                // ---
                // Example:
                // const response = await fetch('/api/posts'); // Your MongoDB API endpoint
                // const data = await response.json();
                // setPosts(data);
                // ---

                // Simulating a network request delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setPosts(mockPosts); // Using mock data for now

            } catch (error) {
                console.error("Error fetching posts: ", error);
                // You could set an error state here to show in the UI
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []); // Runs once on component mount

    // Effect to close menu on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                headerRef.current && 
                !headerRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef, headerRef]);

    return (
        <div className="font-['Inter'] flex items-center justify-center min-h-screen bg-gray-100">
            {/* Main App Container */}
            <div className="w-full max-w-md mx-auto bg-white sm:rounded-2xl shadow-2xl overflow-hidden relative h-screen sm:h-[90vh]">
                
                <div ref={headerRef}>
                    <AppHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
                
                {isMenuOpen && <DropdownMenu menuRef={menuRef} />}
                
                <FeedContent posts={posts} isLoading={isLoading} />
                
            </div>
        </div>
    );
}

