export interface Post {
	identifier: string;
	title: string;
	slug: string;
	subName: string;
	createdAt: string;
	updatedAt: string;
	body?: string;
	username: string;
	sub?: Sub;
	// Virtual fields
	url: string;
	voteScore?: number;
	commentCount?: number;
	userVote?: number;
}

export interface User {
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface Sub {
	createdAt: string;
	updatedAt: string;
	name: string;
	title: string;
	description: string;
	imageUrn: string;
	bannerUrn: string;
	username: string;
	posts: Post[];
	// virtuals
	imageUrl: string;
	bannerUrl: string;
	postCount?: number;
}

export interface Comment {
	createdAt: string;
	updatedAt: string;
	identifier: string;
	body: string;
	username: string;
	post?: Post;
	// virtuals
	voteScore: number;
	userVote: number;
}
