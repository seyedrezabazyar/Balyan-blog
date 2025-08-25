// types/blog.ts - اضافه کردن slug برای نویسندگان
export interface Author {
    id: number
    name: string
    slug: string  // اضافه شده
    bio?: string
    avatar?: string
    website?: string
    social_links?: Record<string, string>
    books_count?: number
}

export interface Category {
    id: number
    name: string
    slug: string
    description?: string
    books_count?: number
}

export interface Publisher {
    id: number
    name: string
    slug?: string  // اضافه شده
    description?: string
    website?: string
    logo?: string
    books_count?: number
}

export interface Book {
    id: number
    title: string
    slug: string
    excerpt?: string
    content?: string
    cover_image?: string
    publication_year?: number
    pages_count?: number
    language: string
    view_count?: number
    like_count?: number
    download_count?: number
    created_at?: string
    updated_at?: string
    formatted_date?: string
    authors: Author[]
    category?: Category
    publisher?: Publisher
    available_formats?: string[]
}

export interface PaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
    has_more: boolean
}

export interface ApiResponse<T> {
    success: boolean
    data: T
    meta?: PaginationMeta
    message?: string
}

export interface SidebarData {
    categories: Array<{
        id: number
        name: string
        slug: string
        books_count: number
    }>
    recent_books: Array<{
        id: number
        title: string
        slug: string
        cover_image?: string
        authors: Author[]
        formatted_date: string
        available_formats?: string[]
    }>
    popular_books: Array<{
        id: number
        title: string
        slug: string
        cover_image?: string
        authors: Author[]
        view_count?: number
        available_formats?: string[]
    }>
    authors: Array<{
        id: number
        name: string
        slug: string
        books_count: number
    }>
    publishers: Array<{
        id: number
        name: string
        slug: string
        books_count: number
    }>
    statistics: {
        total_books: number
        total_authors: number
        total_categories: number
        total_publishers: number
        total_views: number
    }
}
