import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

const Profiles = () => {
    const fixedUsername = "tanguturi_rajesh";

    const [currentUsername, setCurrentUsername] = useState(fixedUsername);
    const [graphData, setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // GraphQL query for LeetCode user contest ranking history
    const LEETCODE_CONTEST_HISTORY_QUERY = `
        query userContestRankingHistory($username: String!) {
            userContestRankingHistory(username: $username) {
                attended
                rating
                ranking
                problemsSolved
                contest {
                    title
                    startTime
                }
            }
        }
    `;

    const fetchContestHistory = async (user) => {
        setLoading(true);
        setError(null);
        setGraphData([]);

        const graphqlEndpoint = "https://leetcode.com/graphql";

        try {
            const response = await fetch(graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: LEETCODE_CONTEST_HISTORY_QUERY,
                    variables: { username: user },
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.errors) {
                // Handle GraphQL errors
                throw new Error(result.errors.map(err => err.message).join(', '));
            }

            const data = result.data;

            if (data && data.userContestRankingHistory) {
                const processedData = data.userContestRankingHistory
                    .filter(entry => entry.attended && entry.rating > 0) // Filter for attended contests with valid ratings
                    .map((entry, index) => ({
                        // You can adjust the 'name' based on contest title if available and unique
                        name: entry.contest?.title || `Contest ${index + 1}`,
                        rating: entry.rating,
                        ranking: entry.ranking,
                        problemsSolved: entry.problemsSolved,
                    }));

                if (processedData.length === 0) {
                    setError(`No valid attended contest rating data found for '${user}'. This could mean the user has not participated in rated contests, or the data is not available.`);
                }
                setGraphData(processedData);
            } else {
                setError(`Unexpected GraphQL response structure for '${user}'.`);
            }
        } catch (err) {
            console.error("Failed to fetch contest history:", err);
            setError(`Failed to fetch data for '${user}': ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContestHistory(fixedUsername);
    }, []);

    return (
        <div
            className="bg-base-100 text-base-content px-4 py-10 font-sans overflow-y-auto custom-scrollbar"
            style={{
                height: "calc(100vh - 7.8rem)",
            }}
        >
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
                        LeetCode Profiles
                    </h1>
                    <p className="text-base-content/70 mt-4 text-lg sm:text-xl">
                        Displaying contest rating history for {currentUsername}.
                    </p>
                </div>

                {/* Graph Display Section */}
                <section className="bg-base-200 border border-base-300 rounded-xl p-6 sm:p-8 shadow min-h-[400px] flex items-center justify-center">
                    {loading && (
                        <div className="flex flex-col items-center text-primary">
                            <Loader2 className="animate-spin w-10 h-10 mb-4" />
                            <p className="text-lg">Loading contest data for {currentUsername}...</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center text-error">
                            <AlertCircle className="w-10 h-10 mb-4" />
                            <p className="text-lg text-center">{error}</p>
                            <p className="text-sm text-base-content/70 mt-2">
                                Please ensure the username is correct or try a different one.
                            </p>
                        </div>
                    )}

                    {!loading && !error && graphData.length > 0 && (
                        <div className="w-full h-[500px]">
                            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
                                Rating History for {currentUsername}
                            </h2>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={graphData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                                    {/* XAxis tick formatting to handle longer contest names if needed */}
                                    <XAxis dataKey="name" stroke="#a0a0a0" tick={{ fill: '#a0a0a0', fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                                    <YAxis stroke="#a0a0a0" tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', border: '1px solid #555', borderRadius: '8px' }}
                                        labelStyle={{ color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value, name, props) => {
                                            if (name === 'rating') return [`Rating: ${value.toFixed(2)}`];
                                            if (name === 'ranking') return [`Rank: ${value}`];
                                            if (name === 'problemsSolved') return [`Problems Solved: ${value}`];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px', color: '#a0a0a0' }} />
                                    <Line
                                        type="monotone"
                                        dataKey="rating"
                                        stroke="#8884d8"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {!loading && !error && graphData.length === 0 && (
                        <div className="text-center text-base-content/70">
                            <p className="text-lg">No rating data found for {currentUsername}.</p>
                            <p className="text-sm text-base-content/70 mt-2">
                                This could be due to a new user, or no attended rated contests.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Profiles;