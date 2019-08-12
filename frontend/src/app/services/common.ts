export interface IMovie {
    id: number;
    name: string;
    description: string;
    image_url: string;
    init_date: Date;
    end_date: Date;
    vacancy: number;
    isVacancy: number;
    status: boolean;
}

export class Movie implements IMovie {
    id: number;
    name: string;
    description: string;
    image_url: string;
    init_date: Date;
    end_date: Date;
    vacancy: number;
    isVacancy: number;
    status: boolean;
}

export interface IReservation {
    id: number;
    movie: IMovie;
    movie_id: number;
    full_name: string;
    document: string;
    email: string;
    phone: string;
    date: Date;
}

export class Reservation implements IReservation {
    id: number;
    movie: IMovie;
    movie_id: number;
    full_name: string;
    document: string;
    email: string;
    phone: string;
    date: Date;
}