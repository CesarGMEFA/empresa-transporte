import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase.js";
import { staff } from "@/lib/typeStaff.ts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Tabla from "./components/Tabla";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import FormAdd from "./components/FormAdd";

function App() {
  const [empleados, setEmpleados] = useState([] as staff[]);
  const [masHoras, setMasHoras] = useState({} as staff);

  useEffect(() => {
    getEmpleados();
    getEmpleadoMasHoratrabaja();
  }, []);

  async function getEmpleados() {
    try {
      const { data: Empleados, error } = await supabase
        .from("Empleados")
        .select(
          "id,nombre,salario_por_hora,horas_trabajadas,horas_semana,semanas_trabajadas"
        );

      if (error) throw error;
      setEmpleados(Empleados);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getEmpleadoMasHoratrabaja() {
    try {
      const { data: Empleado, error } = await supabase
        .from("Empleados")
        .select("id,nombre,salario_por_hora,horas_trabajadas")
        .order("horas_trabajadas", { ascending: false });

      if (error) throw error;
      console.log("Empleado que mas horas trabaja", Empleado);
      setMasHoras(Empleado[0]);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <main className="flex flex-col justify-between items-center mx-8 mt-10">
      <section>
        <h1>II Corte- Tarea I y II</h1>
        <h2>Ing. Madglodi Florez</h2>
        <h2>C&eacute;sar Mejias. Escuela 47.</h2>
      </section>
      <Separator />
      <section className="flex items-center justify-evenly my-4">
        <div>
          <h3>El/La que mas trabaja: </h3>
          <p>
            {masHoras.nombre}, {masHoras.horas_trabajadas} horas.
          </p>
        </div>
      </section>
      <Separator />
      <Card>
        <CardHeader>
          <Dialog>
            <DialogTrigger>
              <Button>Agregar Empleado</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Formulario para editar</DialogTitle>
                <DialogDescription>
                  <FormAdd />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="py-5">
          <Tabla empleados={empleados} />
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
