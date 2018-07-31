export class Filters {
    segments: Filter[] = [];
    statuses: Filter[] = [];
    categories: Filter[] = [];
    brands: Filter[] = [];
}

export class SelectedFilters {
    segments: Set<Filter>;
    statuses: Set<Filter>;
    categories: Set<Filter>;
    brands: Set<Filter>;
}
export class Filter {
    id: number;
    name: string;
}

export class FiltersParams {
    segments?: string;
    statuses?: string;
    categories?: string;
    brands?: string;
}

export class FiltersGroupSelected {
    segments: boolean = false;
    statuses: boolean = false;
    categories: boolean = false;
    brands: boolean = false;
}
