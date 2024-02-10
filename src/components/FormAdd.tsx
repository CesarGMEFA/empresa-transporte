
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@supabase/supabase-js";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nombre: z.string().min(2).max(50),
  salario_por_hora: z.any(),
  horas_trabajadas: z.any(),
  horas_semana: z.any(),
  semanas_trabajadas: z.any()
});

function FormAdd() {
  const supabase = createClient("https://bqktkajdreerenedeapl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxa3RrYWpkcmVlcmVuZWRlYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MjYxMTksImV4cCI6MjAyMzEwMjExOX0.rwizcUaldZJiof8boU3cZjwgDErYXd51WYtpiVIc27Q");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      salario_por_hora: '',
      horas_trabajadas: '',
      horas_semana: '',
      semanas_trabajadas: '',

    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {

      const { data, error } = await supabase
        .from('Empleados')
        .insert({
          nombre: values.nombre,
          salario_por_hora: values.salario_por_hora,
          horas_trabajadas: values.horas_trabajadas,
          horas_semana: values.horas_semana,
          semanas_trabajadas: values.semanas_trabajadas
        })
        .select();

      if (error) throw error;
      console.log("actualizado", data);
    } catch (error) {
      console.log("error", error);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salario_por_hora"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salario por hora</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horas_trabajadas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horas Trabajadas</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horas_semana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horas Semana</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semanas_trabajadas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semanas Trabajadas</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Agregar</Button>
      </form>
    </Form>
  );
}

export default FormAdd;
