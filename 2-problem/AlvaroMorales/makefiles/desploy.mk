S3_BUCKET = bucket-dev-dimention-app-01
FILE_NAME = app.zip

create_bucket:
	aws s3 mb s3://${S3_BUCKET}
deploy:
	cd app && npm run build
	cd ..
	mkdir -p app/build
	cp -R app/dist/* app/build
	cp -R app/node_modules app/build
	ls -al app/build
	cd app/build && zip -rq ../../app.zip *
	# Copiar el archivo al bucket
	aws s3 cp "${FILE_NAME}" "s3://${S3_BUCKET}/";
	cd terraform && terraform init && terraform apply
	cd .. && cd ..
	rm app.zip