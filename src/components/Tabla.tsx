import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { staff } from "@/lib/typeStaff";
import { PencilLine, Trash2 } from "lucide-react";
import FormEdit from "./FormEdit";

type Props = {
  empleados: staff[];
};

export default function Tabla({ empleados }: Props) {
  console.log(" empleados +> ", empleados);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Salario/Hora</TableHead>
          <TableHead className="text-left">Horas Trabajadas</TableHead>
          <TableHead className="text-left">Horas/Semanal</TableHead>
          <TableHead className="text-left">Semanas Trabajadas</TableHead>
          <TableHead className="text-left">Salario Semanal</TableHead>
          <TableHead className="text-left">Editar</TableHead>
          <TableHead className="text-left">Eliminar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {empleados.map((empleado) => (
          <TableRow key={empleado.id}>
            <TableCell className="font-medium">{empleado.id}</TableCell>
            <TableCell>{empleado.nombre}</TableCell>
            <TableCell>{empleado.salario_por_hora}</TableCell>
            <TableCell className="text-right">
              {empleado.horas_trabajadas}
            </TableCell>
            <TableCell className="text-right">
              {empleado.horas_semana}
            </TableCell>
            <TableCell className="text-right">
              {empleado.semanas_trabajadas}
            </TableCell>
            <TableCell className="text-right">
              $
              {(empleado.salario_por_hora * empleado.horas_semana) /
                empleado.semanas_trabajadas}
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger>
                  <PencilLine />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Formulario para editar</DialogTitle>
                    <DialogDescription>
                      <FormEdit id={empleado.id}/>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
            <TableCell className="text-right">
                <Trash2 />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
