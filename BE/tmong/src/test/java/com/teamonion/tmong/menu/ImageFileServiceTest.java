package com.teamonion.tmong.menu;

import com.teamonion.tmong.exception.GlobalException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(MockitoJUnitRunner.class)
public class ImageFileServiceTest {

    @InjectMocks
    ImageFileService imageFileService;

    private MockMultipartFile mockMultipartFile;

    @Test(expected = GlobalException.class)
    public void 이미지저장_파일부재() {
        mockMultipartFile = new MockMultipartFile("test", null, null, (byte[]) null);

        imageFileService.imageSaveProcess(mockMultipartFile);
    }

    @Test(expected = GlobalException.class)
    public void 이미지저장_이미지이외의파일타입() throws IOException {
        String imagePath = "src/test/resources/file.pdf";
        mockMultipartFile = new MockMultipartFile("file", "file.pdf",
                "application/pdf", new FileInputStream(new File(imagePath)));

        imageFileService.imageSaveProcess(mockMultipartFile);
    }

    @Test
    public void 이미지저장_성공() throws IOException {
        String imagePath = "src/test/resources/cat.jpg";
        mockMultipartFile = new MockMultipartFile("cat2", "cat2.jpg",
                "image/jpg", new FileInputStream(new File(imagePath)));

        assertThat(imageFileService.imageSaveProcess(mockMultipartFile)).isNotBlank();
        assertThat(imageFileService.imageSaveProcess(mockMultipartFile)).contains(mockMultipartFile.getOriginalFilename());
    }

}