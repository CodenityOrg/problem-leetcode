### Nota
* Tene en cuenta  tener instalado AWS CLI y actualizado las credenciales localmente para que en el deploy todo funciona bien
* tener en cuenta crear un bucket en su AWS S3_BUCKET = bucket-dev-dimention-app-01 con un nombre diferente y realizar la modificacion dentro de makefiles/deploy.mk y dentro de cada main del modulo.

1. **Directorios**

| Carpetas | Descripcion |
| ---------- | --------- |
| `app` | carpeta de la aplicacion |
| `terraform` | carpeta para la creacion de la infra |
| `Makefile` | automatizaciones |

2. **Ejecucion**

```bash
make install
make up
```
3. **Eliminacion ejecucion**
```bash
make down
```

4. **Despliegue**
```bash
make deploy
```