
package com.hal.model.service;

import java.io.IOException;
import java.nio.file.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.hal.config.StorageProperties;
import com.hal.exception.FileStorageException;

@Service
public class ImageService {

	private final Path fileStorageLocation;

	@Autowired
	public ImageService(StorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (Exception ex) {
			throw new FileStorageException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", ex);
		}
	}

	public void saveImage(MultipartFile eFile,String subPath) {
		// 파일 이름
		String fileName = StringUtils.cleanPath(eFile.getOriginalFilename());
		String fileUri = fileStorageLocation+"/"+ subPath+"/"+ fileName;

		try { // 파일명에 부적합 문자가 있는지 확인한다.
			if (fileName.contains("..")) {
				throw new FileStorageException("파일명에 부적합 문자가 포함되어 있습니다. " + fileName);
			}
			// 동일한 파일 이름이 존재한다면 copy 대체
			Path targetLocation = this.fileStorageLocation.resolve(fileName);
			Files.copy(eFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}
	

	public void deleteImage(String imageName) {
		try {
			Path targetLocation = this.fileStorageLocation.resolve(imageName);
			Files.delete(targetLocation);
		} catch (IOException ex) {
			throw new FileStorageException("Could not delete file " + imageName + ". Please try again!", ex);
		}
	}

}
