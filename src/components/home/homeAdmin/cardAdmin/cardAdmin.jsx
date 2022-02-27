export const CardAdmin = ({full_name, name, date}) => {
    return(
        <div>
            <Card type="inner" title="Citas pendientes" extra={<a href={`/service/${id}`}>Detalles</a>}>
                <h3>El paciente {full_name}</h3>
                {`Tiene una cita de ${name} el ${dateC}`}
            </Card>
        </div>
    )
}