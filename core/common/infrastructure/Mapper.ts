export interface Mapper<M, D> {
    toDomain(dto: D): M

    toApi(model: M): D
}